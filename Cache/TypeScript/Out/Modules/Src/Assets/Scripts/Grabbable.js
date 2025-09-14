"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grabbable = void 0;
var __selfType = requireType("./Grabbable");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const InteractionManager_1 = require("SpectaclesInteractionKit.lspkg/Core/InteractionManager/InteractionManager");
const Interactor_1 = require("SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor");
const SIK_1 = require("SpectaclesInteractionKit.lspkg/SIK");
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
let Grabbable = class Grabbable extends BaseScriptComponent {
    onAwake() {
        print(`[Grabbable] onAwake on object: ${this.sceneObject.name}`);
        // Resolve collider directly from the object to avoid mis-assigned inputs
        this.collider = this.sceneObject.getComponent("ColliderComponent");
        // Validate collider type has expected API
        if (!this.collider || !this.collider.onOverlapEnter) {
            print("[Grabbable] ERROR: ColliderComponent is still missing. Grabbing will not work.");
            return;
        }
        // Configure overlap to include intangible (hands can be intangible) and both dynamic/static
        this.collider.overlapFilter.includeIntangible = true;
        if (this.collider.overlapFilter.includeDynamic !== undefined) {
            this.collider.overlapFilter.includeDynamic = true;
        }
        if (this.collider.overlapFilter.includeStatic !== undefined) {
            this.collider.overlapFilter.includeStatic = true;
        }
        // Do not auto-toggle ShowCollider here; leave visualization to the scene setup
        this.collider.onOverlapEnter.add(this.onOverlapEnter.bind(this));
        this.collider.onOverlapExit.add(this.onOverlapExit.bind(this));
        print(`[Grabbable] Using handColliderName='${this.handColliderName}'. Waiting for overlap with that object name. proximityGrabRadius=${this.proximityGrabRadius}`);
        this.gestureModule.getGrabBeginEvent(GestureModule.HandType.Right)
            .add((GrabBeginArgs) => this.onGrabBegin(InteractionManager_1.InteractionManager.getInstance().getInteractorsByType(Interactor_1.InteractorInputType.RightHand)[0]));
        this.gestureModule.getGrabEndEvent(GestureModule.HandType.Right)
            .add((GrabEndArgs) => this.onGrabEnd(InteractionManager_1.InteractionManager.getInstance().getInteractorsByType(Interactor_1.InteractorInputType.RightHand)[0]));
        this.gestureModule.getGrabBeginEvent(GestureModule.HandType.Left)
            .add((GrabBeginArgs) => this.onGrabBegin(InteractionManager_1.InteractionManager.getInstance().getInteractorsByType(Interactor_1.InteractorInputType.LeftHand)[0]));
        this.gestureModule.getGrabEndEvent(GestureModule.HandType.Left)
            .add((GrabEndArgs) => this.onGrabEnd(InteractionManager_1.InteractionManager.getInstance().getInteractorsByType(Interactor_1.InteractorInputType.LeftHand)[0]));
    }
    onOverlapEnter(e) {
        const otherSo = e.overlap.collider.getSceneObject();
        const otherName = otherSo.name;
        print(`[Grabbable] onOverlapEnter with '${otherName}'`);
        const wildcard = this.handColliderName === '*';
        const exactMatch = otherName === this.handColliderName;
        const relaxedMatch = otherName.indexOf('Collider') >= 0 || otherName.indexOf('Hand') >= 0;
        if (wildcard || exactMatch || relaxedMatch) {
            if (!this.isHandOverlapping) {
                this.onHoverStartEvent.invoke();
            }
            this.isHandOverlapping = true;
            if (!exactMatch && !wildcard) {
                print(`[Grabbable] TIP: Consider setting handColliderName='${otherName}' for stricter matching.`);
            }
        }
        else {
            // Helpful guidance if name doesn't match
            print(`[Grabbable] Overlap ignored: expected handColliderName '${this.handColliderName}', got '${otherName}'.`);
        }
    }
    onOverlapExit(e) {
        const otherName = e.overlap.collider.getSceneObject().name;
        print(`[Grabbable] onOverlapExit with '${otherName}'`);
        const wildcard = this.handColliderName === '*';
        const exactMatch = otherName === this.handColliderName;
        const relaxedMatch = otherName.indexOf('Collider') >= 0 || otherName.indexOf('Hand') >= 0;
        if (wildcard || exactMatch || relaxedMatch) {
            if (this.isHandOverlapping) {
                this.onHoverEndEvent.invoke();
            }
            this.isHandOverlapping = false;
        }
    }
    onGrabBegin(interactor) {
        var _a, _b, _c;
        print(`[Grabbable] onGrabBegin, isHandOverlapping=${this.isHandOverlapping}, interactorInputType=${interactor === null || interactor === void 0 ? void 0 : interactor.inputType}`);
        if (this.isHandOverlapping) {
            this.isGrabbed = true;
            this.onGrabStartEvent.invoke(interactor);
        }
        else {
            // Proximity fallback: if within radius, allow grab anyway
            try {
                const handInputData = SIK_1.SIK.HandInputData;
                const hand = handInputData.getHand(interactor.inputType == Interactor_1.InteractorInputType.LeftHand ? 'left' : 'right');
                const handPos = (_b = (_a = hand === null || hand === void 0 ? void 0 : hand.indexKnuckle) === null || _a === void 0 ? void 0 : _a.position) !== null && _b !== void 0 ? _b : (_c = hand === null || hand === void 0 ? void 0 : hand.wrist) === null || _c === void 0 ? void 0 : _c.position;
                const objPos = this.sceneObject.getTransform().getWorldPosition();
                const dist = handPos ? handPos.distance(objPos) : Number.MAX_VALUE;
                print(`[Grabbable] Proximity check: dist=${(dist === null || dist === void 0 ? void 0 : dist.toFixed) ? dist.toFixed(2) : dist}cm, radius=${this.proximityGrabRadius}`);
                if (this.proximityGrabRadius > 0 && dist < this.proximityGrabRadius) {
                    this.isGrabbed = true;
                    print(`[Grabbable] Proximity within radius. Forcing grab start.`);
                    this.onGrabStartEvent.invoke(interactor);
                    return;
                }
            }
            catch (e) {
                print(`[Grabbable] Proximity check failed: ${e}`);
            }
            print(`[Grabbable] Grab begin ignored because hand is not overlapping. Check collider and handColliderName.`);
        }
    }
    onGrabEnd(interactor) {
        print(`[Grabbable] onGrabEnd, wasGrabbed=${this.isGrabbed}`);
        if (this.isGrabbed) {
            this.onGrabEndEvent.invoke(interactor);
        }
        this.isGrabbed = false;
    }
    __initialize() {
        super.__initialize();
        this.isGrabbed = false;
        this.isHandOverlapping = false;
        this.gestureModule = require('LensStudio:GestureModule');
        this.onGrabStartEvent = new Event_1.default();
        this.onGrabEndEvent = new Event_1.default();
        this.onHoverStartEvent = new Event_1.default();
        this.onHoverEndEvent = new Event_1.default();
    }
};
exports.Grabbable = Grabbable;
exports.Grabbable = Grabbable = __decorate([
    component
], Grabbable);
//# sourceMappingURL=Grabbable.js.map