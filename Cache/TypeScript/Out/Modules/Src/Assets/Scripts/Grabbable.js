"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grabbable = void 0;
var __selfType = requireType("./Grabbable");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const InteractionManager_1 = require("SpectaclesInteractionKit.lspkg/Core/InteractionManager/InteractionManager");
const Interactor_1 = require("SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor");
const SIK_1 = require("SpectaclesInteractionKit.lspkg/SIK");
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
let Grabbable = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var Grabbable = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.isGrabbed = false;
            this.isHandOverlapping = false;
            this.collider = this.collider;
            this.handColliderName = this.handColliderName;
            this.proximityGrabRadius = this.proximityGrabRadius;
            this.gestureModule = require('LensStudio:GestureModule');
            this.onGrabStartEvent = new Event_1.default();
            this.onGrabEndEvent = new Event_1.default();
            this.onHoverStartEvent = new Event_1.default();
            this.onHoverEndEvent = new Event_1.default();
        }
        __initialize() {
            super.__initialize();
            this.isGrabbed = false;
            this.isHandOverlapping = false;
            this.collider = this.collider;
            this.handColliderName = this.handColliderName;
            this.proximityGrabRadius = this.proximityGrabRadius;
            this.gestureModule = require('LensStudio:GestureModule');
            this.onGrabStartEvent = new Event_1.default();
            this.onGrabEndEvent = new Event_1.default();
            this.onHoverStartEvent = new Event_1.default();
            this.onHoverEndEvent = new Event_1.default();
        }
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
    };
    __setFunctionName(_classThis, "Grabbable");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Grabbable = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Grabbable = _classThis;
})();
exports.Grabbable = Grabbable;
//# sourceMappingURL=Grabbable.js.map