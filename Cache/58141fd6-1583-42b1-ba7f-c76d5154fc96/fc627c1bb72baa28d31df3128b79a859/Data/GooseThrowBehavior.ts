import WorldCameraFinderProvider from "SpectaclesInteractionKit.lspkg/Providers/CameraProvider/WorldCameraFinderProvider";
import { SIK } from "SpectaclesInteractionKit.lspkg/SIK";
import { Interactor, InteractorInputType } from "SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor";
import { Grabbable } from "./Grabbable";

/**
 * @component
 * @class GooseThrowBehavior
 *
 * Pick-up and throw behavior adapted from Throw Lab's TennisBallBehavior,
 * tailored for the goose car. Requires:
 * - Physics BodyComponent on the same SceneObject (dynamic, not intangible)
 * - ColliderComponent (for Grabbable overlap)
 * - Grabbable.ts attached on the same SceneObject
 * - Optional: RenderMeshVisual and an outline Material for hover highlight
 */
@component
export class GooseThrowBehavior extends BaseScriptComponent {
    @input
    @allowUndefined
    audio: AudioComponent;

    @input
    @hint('Material used to outline the object on hover (optional)')
    public targetOutlineMaterial: Material;

    @input
    @allowUndefined
    public meshVisual: RenderMeshVisual;

    // Physics
    physicsBody: BodyComponent;

    // Cache transform
    protected t: Transform;

    // Hand input
    private handInputData = SIK.HandInputData;
    private hand = this.handInputData.getHand('right');

    // State
    private isHolding = false;
    private accumulatedForce: vec3 = vec3.zero();
    private prevHandVelocity: vec3 = vec3.zero();

    // Tunables (heavier than the tennis ball)
    protected OBJECT_MASS = 4.0; // approximate mass for the goose car in scene units
    protected HAND_ACCELERATION_MULTIPLIER = 0.05; // slightly reduced to account for heavier object
    protected HAND_BASE_VELOCITY_MULTIPLIER = 0.5;

    private grabbable: Grabbable;
    private highlightMaterial: Material;

    // Initial offsets captured when grab starts
    initialHandPos: vec3;
    initialTPos: vec3;
    initialHandRot: quat;
    initialTRot: quat;

    onAwake() {
        // Components
        this.grabbable = this.sceneObject.getComponent(Grabbable.getTypeName());
        if (!this.grabbable) {
            print("GooseThrowBehavior requires a Grabbable component on the same object.");
            return;
        }

        this.physicsBody = this.sceneObject.getComponent("Physics.BodyComponent");
        if (!this.physicsBody) {
            print("GooseThrowBehavior requires a Physics BodyComponent on the same object.");
            return;
        }

        // Optional audio low latency
        if (this.audio) {
            this.audio.playbackMode = Audio.PlaybackMode.LowLatency;
        }

        // Configure physics
        this.physicsBody.mass = this.OBJECT_MASS;

        // Hover highlight setup
        if (this.targetOutlineMaterial) {
            this.highlightMaterial = this.targetOutlineMaterial.clone();
        }

        // Events
        this.grabbable.onHoverStartEvent.add(() => this.addMaterialToRenderMeshArray());
        this.grabbable.onHoverEndEvent.add(() => this.removeMaterialFromRenderMeshArray());
        this.grabbable.onGrabStartEvent.add(this.onGrabStart.bind(this));
        this.grabbable.onGrabEndEvent.add(this.onGrabEnd.bind(this));

        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));

        this.t = this.getTransform();
    }

    onGrabStart(interactor: Interactor) {
        this.hand = this.handInputData.getHand(
            interactor.inputType == InteractorInputType.LeftHand ? 'left' : 'right'
        );

        this.initialHandPos = this.hand.indexKnuckle.position;
        this.initialTPos = this.t.getWorldPosition();
        this.initialHandRot = this.hand.indexKnuckle.rotation;
        this.initialTRot = this.t.getWorldRotation();

        // Position and orient at fingertip/thumb midpoint
        let startPoint = this.hand.indexKnuckle.position.add(this.hand.thumbKnuckle.position).uniformScale(0.5);
        let nudgeLeftDir = this.hand.middleKnuckle.position.sub(this.hand.pinkyKnuckle.position);
        startPoint = startPoint.add(nudgeLeftDir.normalize().uniformScale(5));
        let nudgeUpDir = this.hand.indexKnuckle.position.sub(this.hand.wrist.position);
        startPoint = startPoint.add(nudgeUpDir.normalize().uniformScale(3));

        let endPoint = this.hand.indexTip.position.add(this.hand.thumbTip.position).uniformScale(0.5);
        let direction = endPoint.sub(startPoint);

        this.t.setWorldPosition(endPoint);
        this.t.setWorldRotation(quat.lookAt(direction, vec3.up()));

        // Zero out velocities and accumulators while holding
        this.physicsBody.intangible = true; // avoid physics interference while held
        this.physicsBody.dynamic = false;

        this.prevHandVelocity = vec3.zero();
        this.accumulatedForce = vec3.zero();
        this.isHolding = true;
    }

    onGrabEnd() {
        // Re-enable physics
        this.physicsBody.intangible = false;
        this.physicsBody.dynamic = true;

        // Apply throw velocity
        let baseVelocity = this.getHandVelocity().uniformScale(this.HAND_BASE_VELOCITY_MULTIPLIER);
        this.physicsBody.velocity = baseVelocity.add(this.accumulatedForce);

        this.isHolding = false;
        this.prevHandVelocity = vec3.zero();
        this.accumulatedForce = vec3.zero();
    }

    private addMaterialToRenderMeshArray() {
        if (!this.meshVisual || !this.highlightMaterial) { return; }
        const matCount = this.meshVisual.getMaterialsCount();
        let addMaterial = true;
        for (let k = 0; k < matCount; k++) {
            const material = this.meshVisual.getMaterial(k);
            if (material.isSame(this.highlightMaterial)) {
                addMaterial = false; break;
            }
        }
        if (addMaterial) {
            const materials = this.meshVisual.materials;
            materials.unshift(this.highlightMaterial);
            this.meshVisual.materials = materials;
        }
    }

    private removeMaterialFromRenderMeshArray() {
        if (!this.meshVisual || !this.highlightMaterial) { return; }
        const materials: Material[] = [];
        const matCount = this.meshVisual.getMaterialsCount();
        for (let k = 0; k < matCount; k++) {
            const material = this.meshVisual.getMaterial(k);
            if (material.isSame(this.highlightMaterial)) { continue; }
            materials.push(material);
        }
        this.meshVisual.clearMaterials();
        for (let k = 0; k < materials.length; k++) {
            this.meshVisual.addMaterial(materials[k]);
        }
    }

    private getDeltaHandPos() { return this.hand.indexKnuckle.position.sub(this.initialHandPos); }
    private getDeltaHandRot() { return this.hand.indexKnuckle.rotation.multiply(this.initialHandRot.invert()); }

    private onUpdate() {
        // While holding, follow hand deltas (position + rotation)
        if (this.isHolding) {
            let nPos = this.initialTPos.add(this.getDeltaHandPos());
            this.t.setWorldPosition(nPos);
            let nRot = this.getDeltaHandRot().multiply(this.initialTRot);
            this.t.setWorldRotation(nRot);
        }

        let handVelocity = this.getHandVelocity();
        if (this.isHolding && getDeltaTime() > 0) {
            let handAcceleration = (handVelocity.sub(this.prevHandVelocity)).uniformScale(1 / (Math.max(0.016666, getDeltaTime())));
            this.accumulatedForce = this.accumulatedForce.add(handAcceleration.uniformScale(this.HAND_ACCELERATION_MULTIPLIER));
            this.prevHandVelocity = handVelocity;
        }
    }

    private getHandVelocity(): vec3 {
        if (global.deviceInfoSystem.isEditor()) {
            return WorldCameraFinderProvider.getInstance().forward().uniformScale(-800); // milder editor default
        }
        const objectSpecificData = this.hand.objectTracking3D.objectSpecificData;
        if (objectSpecificData) {
            const handVelocity = objectSpecificData['global'];
            if (handVelocity.length < 2) { return vec3.zero(); }
            return handVelocity;
        }
        return vec3.zero();
    }
}
