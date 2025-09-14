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
    targetObject: SceneObject;
    @input
    @allowUndefined
    audio: AudioComponent;

    @input
    @hint('Material used to outline the object on hover (optional)')
    public targetOutlineMaterial: Material;

    @input
    @allowUndefined
    public meshVisual: RenderMeshVisual;

    @input("float")
    @hint('Optional: override physics mass. Leave 0 to keep existing mass/density from scene.')
    public overrideMass: number = 0;

    @input("int")
    @hint('Minimum time (ms) you must hold before release applies a throw. Prevents accidental flicks.')
    public minHoldDurationMs: number = 120;

    @input
    @allowUndefined
    @hint('Optional: driving script component to disable while holding (e.g., WheelController).')
    public drivingScript: ScriptComponent;

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
    protected OBJECT_MASS = 4.0; // legacy default; only used if overrideMass > 0
    protected HAND_ACCELERATION_MULTIPLIER = 0.05; // slightly reduced to account for heavier object
    protected HAND_BASE_VELOCITY_MULTIPLIER = 0.5;

    private grabbable: Grabbable;
    private highlightMaterial: Material;

    // Initial offsets captured when grab starts
    initialHandPos: vec3;
    initialTPos: vec3;
    initialHandRot: quat;
    initialTRot: quat;

    // Timing & state
    private holdStartTime: number = 0;

    onAwake() {
        const target = this.targetObject ?? this.sceneObject;
        print(`[GooseThrow] onAwake on '${this.sceneObject.name}', target='${target.name}'`);
        // Components
        this.grabbable = target.getComponent(Grabbable.getTypeName());
        if (!this.grabbable) {
            print("[GooseThrow] ERROR: Requires a Grabbable component on the same object.");
            return;
        }

        this.physicsBody = target.getComponent("Physics.BodyComponent");
        if (!this.physicsBody) {
            print("[GooseThrow] ERROR: Requires a Physics BodyComponent on the same object.");
            return;
        }

        // Optional audio low latency
        if (this.audio) {
            this.audio.playbackMode = Audio.PlaybackMode.LowLatency;
        }

        // Ensure driving is enabled on start
        if (this.drivingScript) {
            try { this.drivingScript.enabled = true; } catch (e) {}
        }

        // Configure physics (optional mass override)
        if (this.overrideMass && this.overrideMass > 0) {
            this.physicsBody.mass = this.overrideMass;
            print(`[GooseThrow] Physics configured. mass overridden to ${this.physicsBody.mass}`);
        } else {
            print(`[GooseThrow] Physics configured. Using existing mass from scene: ${this.physicsBody.mass}`);
        }

        // Hover highlight setup
        if (this.targetOutlineMaterial) {
            this.highlightMaterial = this.targetOutlineMaterial.clone();
        }

        // Events
        this.grabbable.onHoverStartEvent.add(() => { print('[GooseThrow] Hover start'); this.addMaterialToRenderMeshArray(); });
        this.grabbable.onHoverEndEvent.add(() => { print('[GooseThrow] Hover end'); this.removeMaterialFromRenderMeshArray(); });
        this.grabbable.onGrabStartEvent.add(this.onGrabStart.bind(this));
        this.grabbable.onGrabEndEvent.add(this.onGrabEnd.bind(this));

        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));

        this.t = target.getTransform();
    }

    onDisable() {
        // Safety restore to prevent stuck states
        try {
            if (this.physicsBody) { this.physicsBody.intangible = false; this.physicsBody.dynamic = true; }
            if (this.drivingScript) { this.drivingScript.enabled = true; }
        } catch (e) {}
    }

    onDestroy() {
        // Safety restore to prevent stuck states
        try {
            if (this.physicsBody) { this.physicsBody.intangible = false; this.physicsBody.dynamic = true; }
            if (this.drivingScript) { this.drivingScript.enabled = true; }
        } catch (e) {}
    }

    onGrabStart(interactor: Interactor) {
        print(`[GooseThrow] onGrabStart. Interactor inputType=${interactor?.inputType}`);
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
        print(`[GooseThrow] Holding. physicsBody: intangible=${this.physicsBody.intangible}, dynamic=${this.physicsBody.dynamic}`);

        // Zero any existing motion while grabbing
        if ((this.physicsBody as any).velocity) { (this.physicsBody as any).velocity = vec3.zero(); }
        if ((this.physicsBody as any).angularVelocity) { (this.physicsBody as any).angularVelocity = vec3.zero(); }

        // Mark hold start time and disable driving if provided
        this.holdStartTime = getTime();
        if (this.drivingScript) {
            try { this.drivingScript.enabled = false; print('[GooseThrow] Disabled driving script while holding.'); } catch (e) {}
        }

        this.prevHandVelocity = vec3.zero();
        this.accumulatedForce = vec3.zero();
        this.isHolding = true;
    }

    onGrabEnd() {
        print('[GooseThrow] onGrabEnd');
        // Re-enable physics
        this.physicsBody.intangible = false;
        this.physicsBody.dynamic = true;

        // Decide whether to apply throw based on hold duration
        const dtMs = (getTime() - this.holdStartTime) * 1000.0;
        if (dtMs >= this.minHoldDurationMs) {
            // Apply throw velocity, with a clamp to prevent runaway launches
            let baseVelocity = this.getHandVelocity().uniformScale(this.HAND_BASE_VELOCITY_MULTIPLIER);
            const finalVel = baseVelocity.add(this.accumulatedForce);
            const maxThrowSpeed = 2000; // cm/s cap to prevent explosions
            const finalLen = (finalVel as any).length;
            const clamped = finalLen && finalLen > maxThrowSpeed ? finalVel.normalize().uniformScale(maxThrowSpeed) : finalVel;
            this.physicsBody.velocity = clamped;
            print(`[GooseThrow] Applied throw. hold=${Math.floor(dtMs)}ms base=${baseVelocity.toString?.() ?? baseVelocity} accum=${this.accumulatedForce.toString?.() ?? this.accumulatedForce} final=${clamped.toString?.() ?? clamped}`);
        } else {
            // Too short: treat as tap, do not throw
            if ((this.physicsBody as any).velocity) { (this.physicsBody as any).velocity = vec3.zero(); }
            if ((this.physicsBody as any).angularVelocity) { (this.physicsBody as any).angularVelocity = vec3.zero(); }
            print(`[GooseThrow] Release ignored (held ${Math.floor(dtMs)}ms < ${this.minHoldDurationMs}ms). No throw applied.`);
        }

        this.isHolding = false;
        this.prevHandVelocity = vec3.zero();
        this.accumulatedForce = vec3.zero();

        // Re-enable driving if provided
        if (this.drivingScript) {
            try { this.drivingScript.enabled = true; print('[GooseThrow] Re-enabled driving script after release.'); } catch (e) {}
        }
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
            // Keep velocities zero while held
            if ((this.physicsBody as any).velocity) { (this.physicsBody as any).velocity = vec3.zero(); }
            if ((this.physicsBody as any).angularVelocity) { (this.physicsBody as any).angularVelocity = vec3.zero(); }
        }

        let handVelocity = this.getHandVelocity();
        // Debug velocity magnitude to ensure tracking
        if (handVelocity) {
            const mag = (handVelocity as any).length;
            if (mag !== undefined) {
                // Rate-limit logs a bit by only printing if holding
                if (this.isHolding) { print(`[GooseThrow] Hand velocity mag=${mag.toFixed ? mag.toFixed(2) : mag}`); }
            }
        }
        if (this.isHolding && getDeltaTime() > 0) {
            let handAcceleration = (handVelocity.sub(this.prevHandVelocity)).uniformScale(1 / (Math.max(0.016666, getDeltaTime())));
            this.accumulatedForce = this.accumulatedForce.add(handAcceleration.uniformScale(this.HAND_ACCELERATION_MULTIPLIER));
            this.prevHandVelocity = handVelocity;
            // Optional: log accumulated magnitude occasionally
            const accMag = (this.accumulatedForce as any).length;
            if (accMag !== undefined) { print(`[GooseThrow] Accumulated magnitude=${accMag.toFixed ? accMag.toFixed(2) : accMag}`); }
        }
    }

    private getHandVelocity(): vec3 {
        if (global.deviceInfoSystem.isEditor()) {
            const vel = WorldCameraFinderProvider.getInstance().forward().uniformScale(-800); // milder editor default
            // Print once in editor to confirm fallback
            // Note: This may print frequently; keep minimal
            return vel;
        }
        const objectSpecificData = this.hand.objectTracking3D.objectSpecificData;
        if (objectSpecificData) {
            const handVelocity = objectSpecificData['global'];
            if (handVelocity.length < 2) { return vec3.zero(); }
            return handVelocity;
        }
        // If we get here, logs will help indicate tracking not found
        // print('[GooseThrow] No objectSpecificData for hand velocity. Returning zero.');
        return vec3.zero();
    }
}
