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

    private gestureModule: GestureModule = require('LensStudio:GestureModule');

    public onGrabStartEvent:Event<Interactor> = new Event<Interactor>();
    public onGrabEndEvent:Event<Interactor> = new Event<Interactor>();

    public onHoverStartEvent:Event = new Event();
    public onHoverEndEvent:Event = new Event();

    onGrabBeginEvent: any;

    onAwake() {

        print(`[Grabbable] onAwake on object: ${this.sceneObject.name}`);

        // Prefer resolving collider directly from the object to avoid mis-assigned inputs
        this.collider = this.sceneObject.getComponent("ColliderComponent") as any;

        // If no collider found in inputs or on object, create a reasonable default
        // If no collider found in inputs or on object, create a reasonable default
        if (!this.collider) {
            print(`[Grabbable] No ColliderComponent found. Creating a default Box collider (FitVisual=true).`);
            try {
                const created = this.sceneObject.createComponent("ColliderComponent") as ColliderComponent;
                // Default to Box fit to visual if possible
                // Note: Shape will default to Box; FitVisual true helps approximate the mesh
                // For complex meshes, you may customize in the Editor
                (created.shape as any).fitVisual = true;
                this.collider = created;
            } catch (e) {
                print(`[Grabbable] Failed to create ColliderComponent: ${e}`);
            }
        }

        // Validate collider type has expected API
        if (!this.collider || !(this.collider as any).onOverlapEnter) {
            print("[Grabbable] ERROR: ColliderComponent is still missing. Grabbing will not work.");
            return;
        }

        // Configure overlap to include intangible (hands can be intangible)
        this.collider.overlapFilter.includeIntangible = true;
        this.collider.onOverlapEnter.add(this.onOverlapEnter.bind(this));
        this.collider.onOverlapExit.add(this.onOverlapExit.bind(this));

        print(`[Grabbable] Using handColliderName='${this.handColliderName}'. Waiting for overlap with that object name.`);

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
        const otherName = e.overlap.collider.getSceneObject().name;
        print(`[Grabbable] onOverlapEnter with '${otherName}'`);
        if (otherName == this.handColliderName) {
            if (!this.isHandOverlapping) { this.onHoverStartEvent.invoke() }
            this.isHandOverlapping = true;
        } else {
            // Helpful guidance if name doesn't match
            print(`[Grabbable] Overlap ignored: expected handColliderName '${this.handColliderName}', got '${otherName}'.`);
        }
    }

    onOverlapExit (e:OverlapExitEventArgs) {
        const otherName = e.overlap.collider.getSceneObject().name;
        print(`[Grabbable] onOverlapExit with '${otherName}'`);
        if (otherName == this.handColliderName) {
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
