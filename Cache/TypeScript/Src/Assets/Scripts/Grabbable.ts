import { InteractionManager } from "SpectaclesInteractionKit.lspkg/Core/InteractionManager/InteractionManager";
import { InteractorInputType } from "SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor";
import { Interactor } from "SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor";
import { SIK } from "SpectaclesInteractionKit.lspkg/SIK";
import Event from "SpectaclesInteractionKit.lspkg/Utils/Event";

@component
export class Grabbable extends BaseScriptComponent {

    private isGrabbed: boolean = false;
    private isHandOverlapping: boolean = false;

    @input
    @allowUndefined
    public collider: ColliderComponent;

    @input
    public handColliderName:string = "ColliderTargetProvider"

    @input("float")
    @hint('If overlap cannot be detected, allow grab when hand is within this distance (cm) from the object. Set 0 to disable.')
    public proximityGrabRadius:number = 0;

    private gestureModule: GestureModule = require('LensStudio:GestureModule');

    public onGrabStartEvent:Event<Interactor> = new Event<Interactor>();
    public onGrabEndEvent:Event<Interactor> = new Event<Interactor>();

    public onHoverStartEvent:Event = new Event();
    public onHoverEndEvent:Event = new Event();

    onGrabBeginEvent: any;

    onAwake() {

        print(`[Grabbable] onAwake on object: ${this.sceneObject.name}`);

        // Resolve collider directly from the object to avoid mis-assigned inputs
        this.collider = this.sceneObject.getComponent("ColliderComponent") as any;

        // Validate collider type has expected API
        if (!this.collider || !(this.collider as any).onOverlapEnter) {
            print("[Grabbable] ERROR: ColliderComponent is still missing. Grabbing will not work.");
            return;
        }

        // Configure overlap to include intangible (hands can be intangible) and both dynamic/static
        this.collider.overlapFilter.includeIntangible = true;
        if ((this.collider.overlapFilter as any).includeDynamic !== undefined) {
            (this.collider.overlapFilter as any).includeDynamic = true;
        }
        if ((this.collider.overlapFilter as any).includeStatic !== undefined) {
            (this.collider.overlapFilter as any).includeStatic = true;
        }
        // Do not auto-toggle ShowCollider here; leave visualization to the scene setup
        this.collider.onOverlapEnter.add(this.onOverlapEnter.bind(this));
        this.collider.onOverlapExit.add(this.onOverlapExit.bind(this));

        print(`[Grabbable] Using handColliderName='${this.handColliderName}'. Waiting for overlap with that object name. proximityGrabRadius=${this.proximityGrabRadius}`);

        this.gestureModule.getGrabBeginEvent(GestureModule.HandType.Right)
            .add((GrabBeginArgs) => this.onGrabBegin(InteractionManager.getInstance().getInteractorsByType(InteractorInputType.RightHand)[0]));

        this.gestureModule.getGrabEndEvent(GestureModule.HandType.Right)
            .add((GrabEndArgs) => this.onGrabEnd(InteractionManager.getInstance().getInteractorsByType(InteractorInputType.RightHand)[0]));

        this.gestureModule.getGrabBeginEvent(GestureModule.HandType.Left)
            .add((GrabBeginArgs) => this.onGrabBegin(InteractionManager.getInstance().getInteractorsByType(InteractorInputType.LeftHand)[0]));

        this.gestureModule.getGrabEndEvent(GestureModule.HandType.Left)
            .add((GrabEndArgs) => this.onGrabEnd(InteractionManager.getInstance().getInteractorsByType(InteractorInputType.LeftHand)[0]));

    }

    onOverlapEnter (e:OverlapEnterEventArgs) {
        const otherSo = e.overlap.collider.getSceneObject();
        const otherName = otherSo.name;
        print(`[Grabbable] onOverlapEnter with '${otherName}'`);
        const wildcard = this.handColliderName === '*';
        const exactMatch = otherName === this.handColliderName;
        const relaxedMatch = otherName.indexOf('Collider') >= 0 || otherName.indexOf('Hand') >= 0;

        if (wildcard || exactMatch || relaxedMatch) {
            if (!this.isHandOverlapping) { this.onHoverStartEvent.invoke() }
            this.isHandOverlapping = true;
            if (!exactMatch && !wildcard) {
                print(`[Grabbable] TIP: Consider setting handColliderName='${otherName}' for stricter matching.`);
            }
        } else {
            // Helpful guidance if name doesn't match
            print(`[Grabbable] Overlap ignored: expected handColliderName '${this.handColliderName}', got '${otherName}'.`);
        }
    }

    onOverlapExit (e:OverlapExitEventArgs) {
        const otherName = e.overlap.collider.getSceneObject().name;
        print(`[Grabbable] onOverlapExit with '${otherName}'`);
        const wildcard = this.handColliderName === '*';
        const exactMatch = otherName === this.handColliderName;
        const relaxedMatch = otherName.indexOf('Collider') >= 0 || otherName.indexOf('Hand') >= 0;
        if (wildcard || exactMatch || relaxedMatch) {
            if (this.isHandOverlapping) { this.onHoverEndEvent.invoke() }
            this.isHandOverlapping = false;
        }
    }

    private onGrabBegin(interactor:Interactor) {
        print(`[Grabbable] onGrabBegin, isHandOverlapping=${this.isHandOverlapping}, interactorInputType=${interactor?.inputType}`);
        if (this.isHandOverlapping) {
            this.isGrabbed = true;
            this.onGrabStartEvent.invoke(interactor);
        } else {
            // Proximity fallback: if within radius, allow grab anyway
            try {
                const handInputData = SIK.HandInputData;
                const hand = handInputData.getHand(interactor.inputType == InteractorInputType.LeftHand ? 'left' : 'right');
                const handPos = hand?.indexKnuckle?.position ?? hand?.wrist?.position;
                const objPos = this.sceneObject.getTransform().getWorldPosition();
                const dist = handPos ? handPos.distance(objPos) : Number.MAX_VALUE;
                print(`[Grabbable] Proximity check: dist=${dist?.toFixed ? dist.toFixed(2) : dist}cm, radius=${this.proximityGrabRadius}`);
                if (this.proximityGrabRadius > 0 && dist < this.proximityGrabRadius) {
                    this.isGrabbed = true;
                    print(`[Grabbable] Proximity within radius. Forcing grab start.`);
                    this.onGrabStartEvent.invoke(interactor);
                    return;
                }
            } catch (e) {
                print(`[Grabbable] Proximity check failed: ${e}`);
            }
            print(`[Grabbable] Grab begin ignored because hand is not overlapping. Check collider and handColliderName.`);
        }
    }

    private onGrabEnd (interactor:Interactor) {
        print(`[Grabbable] onGrabEnd, wasGrabbed=${this.isGrabbed}`);
        if (this.isGrabbed) {
            this.onGrabEndEvent.invoke(interactor);
        }
        this.isGrabbed = false;
    }

}
