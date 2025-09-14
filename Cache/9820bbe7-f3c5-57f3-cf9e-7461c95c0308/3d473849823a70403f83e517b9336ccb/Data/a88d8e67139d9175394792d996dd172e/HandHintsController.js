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
exports.HandHintsController = void 0;
var __selfType = requireType("./HandHintsController");
function component(target) { target.getTypeName = function () { return __selfType; }; }
let HandHintsController = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var HandHintsController = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.mobileDeviceObject = this.mobileDeviceObject;
            this.desiredScale = vec3.zero();
            this.trans = null;
            this.anchorTrans = null;
            this.animationPlayer = null;
        }
        __initialize() {
            super.__initialize();
            this.mobileDeviceObject = this.mobileDeviceObject;
            this.desiredScale = vec3.zero();
            this.trans = null;
            this.anchorTrans = null;
            this.animationPlayer = null;
        }
        onAwake() {
            this.animationPlayer =
                this.getSceneObject().getComponent("AnimationPlayer");
            this.resetPlayer();
            this.trans = this.getSceneObject().getTransform();
            this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
            this.enableHint(this.getSceneObject().getParent().getTransform());
            this.playHandTouchSurface();
        }
        onUpdate() {
            this.trans.setWorldScale(vec3.lerp(this.trans.getWorldScale(), this.desiredScale, getDeltaTime() * 6));
            if (this.anchorTrans != null) {
                this.trans.setWorldPosition(this.anchorTrans.getWorldPosition());
                this.trans.setWorldRotation(this.anchorTrans.getWorldRotation());
                this.trans.setLocalScale(this.anchorTrans.getLocalScale());
            }
        }
        resetPlayer() {
            this.mobileDeviceObject.enabled = false;
            for (var i = 0; i < this.animationPlayer.clips.length; i++) {
                this.animationPlayer.clips[i].disabled = true;
            }
        }
        enableHint(anchor) {
            this.desiredScale = vec3.one();
            this.anchorTrans = anchor;
        }
        disableHint() {
            this.desiredScale = vec3.zero();
            this.trans.setWorldScale(vec3.zero());
            this.anchorTrans = null;
        }
        playMobileTap() {
            this.resetPlayer();
            this.mobileDeviceObject.enabled = true;
            this.animationPlayer.getClip("Controller_Tap").disabled = false;
        }
        playFarPinch() {
            this.resetPlayer();
            this.animationPlayer.getClip("Pinch_Far").disabled = false;
        }
        playHandTouchSurface() {
            this.resetPlayer();
            this.animationPlayer.getClip("Palm_Touch_Near").disabled = false;
        }
        playFarDrag() {
            this.resetPlayer();
            this.animationPlayer.getClip("Pinch_Move_X").disabled = false;
        }
    };
    __setFunctionName(_classThis, "HandHintsController");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HandHintsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HandHintsController = _classThis;
})();
exports.HandHintsController = HandHintsController;
//# sourceMappingURL=HandHintsController.js.map