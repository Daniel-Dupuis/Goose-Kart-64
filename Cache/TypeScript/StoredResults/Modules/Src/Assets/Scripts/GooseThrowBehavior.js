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
exports.GooseThrowBehavior = void 0;
var __selfType = requireType("./GooseThrowBehavior");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const WorldCameraFinderProvider_1 = require("SpectaclesInteractionKit.lspkg/Providers/CameraProvider/WorldCameraFinderProvider");
const SIK_1 = require("SpectaclesInteractionKit.lspkg/SIK");
const Interactor_1 = require("SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor");
const Grabbable_1 = require("./Grabbable");
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
let GooseThrowBehavior = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var GooseThrowBehavior = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.targetObject = this.targetObject;
            this.audio = this.audio;
            this.targetOutlineMaterial = this.targetOutlineMaterial;
            this.meshVisual = this.meshVisual;
            this.overrideMass = this.overrideMass;
            this.minHoldDurationMs = this.minHoldDurationMs;
            this.drivingScript = this.drivingScript;
            // Hand input
            this.handInputData = SIK_1.SIK.HandInputData;
            this.hand = this.handInputData.getHand('right');
            // State
            this.isHolding = false;
            this.accumulatedForce = vec3.zero();
            this.prevHandVelocity = vec3.zero();
            // Tunables (heavier than the tennis ball)
            this.OBJECT_MASS = 4.0; // legacy default; only used if overrideMass > 0
            this.HAND_ACCELERATION_MULTIPLIER = 0.05; // slightly reduced to account for heavier object
            this.HAND_BASE_VELOCITY_MULTIPLIER = 0.5;
            // Timing & state
            this.holdStartTime = 0;
        }
        __initialize() {
            super.__initialize();
            this.targetObject = this.targetObject;
            this.audio = this.audio;
            this.targetOutlineMaterial = this.targetOutlineMaterial;
            this.meshVisual = this.meshVisual;
            this.overrideMass = this.overrideMass;
            this.minHoldDurationMs = this.minHoldDurationMs;
            this.drivingScript = this.drivingScript;
            // Hand input
            this.handInputData = SIK_1.SIK.HandInputData;
            this.hand = this.handInputData.getHand('right');
            // State
            this.isHolding = false;
            this.accumulatedForce = vec3.zero();
            this.prevHandVelocity = vec3.zero();
            // Tunables (heavier than the tennis ball)
            this.OBJECT_MASS = 4.0; // legacy default; only used if overrideMass > 0
            this.HAND_ACCELERATION_MULTIPLIER = 0.05; // slightly reduced to account for heavier object
            this.HAND_BASE_VELOCITY_MULTIPLIER = 0.5;
            // Timing & state
            this.holdStartTime = 0;
        }
        onAwake() {
            var _a;
            const target = (_a = this.targetObject) !== null && _a !== void 0 ? _a : this.sceneObject;
            print(`[GooseThrow] onAwake on '${this.sceneObject.name}', target='${target.name}'`);
            // Components
            this.grabbable = target.getComponent(Grabbable_1.Grabbable.getTypeName());
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
                try {
                    this.drivingScript.enabled = true;
                }
                catch (e) { }
            }
            // Configure physics (optional mass override)
            if (this.overrideMass && this.overrideMass > 0) {
                this.physicsBody.mass = this.overrideMass;
                print(`[GooseThrow] Physics configured. mass overridden to ${this.physicsBody.mass}`);
            }
            else {
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
                if (this.physicsBody) {
                    this.physicsBody.intangible = false;
                    this.physicsBody.dynamic = true;
                }
                if (this.drivingScript) {
                    this.drivingScript.enabled = true;
                }
            }
            catch (e) { }
        }
        onDestroy() {
            // Safety restore to prevent stuck states
            try {
                if (this.physicsBody) {
                    this.physicsBody.intangible = false;
                    this.physicsBody.dynamic = true;
                }
                if (this.drivingScript) {
                    this.drivingScript.enabled = true;
                }
            }
            catch (e) { }
        }
        onGrabStart(interactor) {
            print(`[GooseThrow] onGrabStart. Interactor inputType=${interactor === null || interactor === void 0 ? void 0 : interactor.inputType}`);
            this.hand = this.handInputData.getHand(interactor.inputType == Interactor_1.InteractorInputType.LeftHand ? 'left' : 'right');
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
            if (this.physicsBody.velocity) {
                this.physicsBody.velocity = vec3.zero();
            }
            if (this.physicsBody.angularVelocity) {
                this.physicsBody.angularVelocity = vec3.zero();
            }
            // Mark hold start time and disable driving if provided
            this.holdStartTime = getTime();
            if (this.drivingScript) {
                try {
                    this.drivingScript.enabled = false;
                    print('[GooseThrow] Disabled driving script while holding.');
                }
                catch (e) { }
            }
            this.prevHandVelocity = vec3.zero();
            this.accumulatedForce = vec3.zero();
            this.isHolding = true;
        }
        onGrabEnd() {
            var _a, _b, _c, _d, _e, _f, _g;
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
                const finalLen = finalVel.length;
                const clamped = finalLen && finalLen > maxThrowSpeed ? finalVel.normalize().uniformScale(maxThrowSpeed) : finalVel;
                this.physicsBody.velocity = clamped;
                print(`[GooseThrow] Applied throw. hold=${Math.floor(dtMs)}ms base=${(_b = (_a = baseVelocity.toString) === null || _a === void 0 ? void 0 : _a.call(baseVelocity)) !== null && _b !== void 0 ? _b : baseVelocity} accum=${(_e = (_d = (_c = this.accumulatedForce).toString) === null || _d === void 0 ? void 0 : _d.call(_c)) !== null && _e !== void 0 ? _e : this.accumulatedForce} final=${(_g = (_f = clamped.toString) === null || _f === void 0 ? void 0 : _f.call(clamped)) !== null && _g !== void 0 ? _g : clamped}`);
            }
            else {
                // Too short: treat as tap, do not throw
                if (this.physicsBody.velocity) {
                    this.physicsBody.velocity = vec3.zero();
                }
                if (this.physicsBody.angularVelocity) {
                    this.physicsBody.angularVelocity = vec3.zero();
                }
                print(`[GooseThrow] Release ignored (held ${Math.floor(dtMs)}ms < ${this.minHoldDurationMs}ms). No throw applied.`);
            }
            this.isHolding = false;
            this.prevHandVelocity = vec3.zero();
            this.accumulatedForce = vec3.zero();
            // Re-enable driving if provided
            if (this.drivingScript) {
                try {
                    this.drivingScript.enabled = true;
                    print('[GooseThrow] Re-enabled driving script after release.');
                }
                catch (e) { }
            }
        }
        addMaterialToRenderMeshArray() {
            if (!this.meshVisual || !this.highlightMaterial) {
                return;
            }
            const matCount = this.meshVisual.getMaterialsCount();
            let addMaterial = true;
            for (let k = 0; k < matCount; k++) {
                const material = this.meshVisual.getMaterial(k);
                if (material.isSame(this.highlightMaterial)) {
                    addMaterial = false;
                    break;
                }
            }
            if (addMaterial) {
                const materials = this.meshVisual.materials;
                materials.unshift(this.highlightMaterial);
                this.meshVisual.materials = materials;
            }
        }
        removeMaterialFromRenderMeshArray() {
            if (!this.meshVisual || !this.highlightMaterial) {
                return;
            }
            const materials = [];
            const matCount = this.meshVisual.getMaterialsCount();
            for (let k = 0; k < matCount; k++) {
                const material = this.meshVisual.getMaterial(k);
                if (material.isSame(this.highlightMaterial)) {
                    continue;
                }
                materials.push(material);
            }
            this.meshVisual.clearMaterials();
            for (let k = 0; k < materials.length; k++) {
                this.meshVisual.addMaterial(materials[k]);
            }
        }
        getDeltaHandPos() { return this.hand.indexKnuckle.position.sub(this.initialHandPos); }
        getDeltaHandRot() { return this.hand.indexKnuckle.rotation.multiply(this.initialHandRot.invert()); }
        onUpdate() {
            // While holding, follow hand deltas (position + rotation)
            if (this.isHolding) {
                let nPos = this.initialTPos.add(this.getDeltaHandPos());
                this.t.setWorldPosition(nPos);
                let nRot = this.getDeltaHandRot().multiply(this.initialTRot);
                this.t.setWorldRotation(nRot);
                // Keep velocities zero while held
                if (this.physicsBody.velocity) {
                    this.physicsBody.velocity = vec3.zero();
                }
                if (this.physicsBody.angularVelocity) {
                    this.physicsBody.angularVelocity = vec3.zero();
                }
            }
            let handVelocity = this.getHandVelocity();
            // Debug velocity magnitude to ensure tracking
            if (handVelocity) {
                const mag = handVelocity.length;
                if (mag !== undefined) {
                    // Rate-limit logs a bit by only printing if holding
                    if (this.isHolding) {
                        print(`[GooseThrow] Hand velocity mag=${mag.toFixed ? mag.toFixed(2) : mag}`);
                    }
                }
            }
            if (this.isHolding && getDeltaTime() > 0) {
                let handAcceleration = (handVelocity.sub(this.prevHandVelocity)).uniformScale(1 / (Math.max(0.016666, getDeltaTime())));
                this.accumulatedForce = this.accumulatedForce.add(handAcceleration.uniformScale(this.HAND_ACCELERATION_MULTIPLIER));
                this.prevHandVelocity = handVelocity;
                // Optional: log accumulated magnitude occasionally
                const accMag = this.accumulatedForce.length;
                if (accMag !== undefined) {
                    print(`[GooseThrow] Accumulated magnitude=${accMag.toFixed ? accMag.toFixed(2) : accMag}`);
                }
            }
        }
        getHandVelocity() {
            if (global.deviceInfoSystem.isEditor()) {
                const vel = WorldCameraFinderProvider_1.default.getInstance().forward().uniformScale(-800); // milder editor default
                // Print once in editor to confirm fallback
                // Note: This may print frequently; keep minimal
                return vel;
            }
            const objectSpecificData = this.hand.objectTracking3D.objectSpecificData;
            if (objectSpecificData) {
                const handVelocity = objectSpecificData['global'];
                if (handVelocity.length < 2) {
                    return vec3.zero();
                }
                return handVelocity;
            }
            // If we get here, logs will help indicate tracking not found
            // print('[GooseThrow] No objectSpecificData for hand velocity. Returning zero.');
            return vec3.zero();
        }
    };
    __setFunctionName(_classThis, "GooseThrowBehavior");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GooseThrowBehavior = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GooseThrowBehavior = _classThis;
})();
exports.GooseThrowBehavior = GooseThrowBehavior;
//# sourceMappingURL=GooseThrowBehavior.js.map