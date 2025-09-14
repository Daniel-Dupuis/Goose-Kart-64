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
exports._Void = exports.JoystickInputControl = exports.JoystickInputControlConfig = exports.JoystickPositionTypeConfig = void 0;
var __selfType = requireType("./JoystickInputControl");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const JoystickComponentConfig_1 = require("../../../Resources/Input/JoystickComponent.lsc/Scripts/JoystickComponentConfig");
const JoystickComponent_1 = require("../../../Resources/Input/JoystickComponent.lsc/Scripts/JoystickComponent");
const UiCameraProvider_1 = require("../UiCamera/UiCameraProvider");
var JoystickPositionTypeConfig;
(function (JoystickPositionTypeConfig) {
    JoystickPositionTypeConfig[JoystickPositionTypeConfig["Free"] = 0] = "Free";
    JoystickPositionTypeConfig[JoystickPositionTypeConfig["Left"] = 1] = "Left";
    JoystickPositionTypeConfig[JoystickPositionTypeConfig["Right"] = 2] = "Right";
    JoystickPositionTypeConfig[JoystickPositionTypeConfig["Custom"] = 3] = "Custom";
})(JoystickPositionTypeConfig || (exports.JoystickPositionTypeConfig = JoystickPositionTypeConfig = {}));
class JoystickInputControlConfig {
    constructor() {
        this.joystickPositionTypeConfig = 0;
        this.sensitivity = 0.96;
        this.deadZone = 0.1;
        this.renderOrder = 200;
    }
}
exports.JoystickInputControlConfig = JoystickInputControlConfig;
class JoystickInputControl {
    constructor(joystickInputControlConfig, trackingCameraSO, movablePlane = vec3.up()) {
        this.joystickInputControlConfig = joystickInputControlConfig;
        this.trackingCameraSO = trackingCameraSO;
        this.movablePlane = movablePlane;
        const positionConfig = joystickInputControlConfig.joystickPositionTypeConfig === JoystickPositionTypeConfig.Free ?
            JoystickComponentConfig_1.JoystickComponentPositionConfig.Free : JoystickComponentConfig_1.JoystickComponentPositionConfig.Fixed;
        const joystickConfig = {
            renderOrder: this.joystickInputControlConfig.renderOrder,
            position: positionConfig,
            deadZone: this.joystickInputControlConfig.deadZone,
            sensitivity: this.sensitivity,
            interactiveArea: this.joystickInputControlConfig.interactiveArea,
        };
        const joystickParent = this.getJoystickParent();
        const joystickRoot = global.scene.createSceneObject("Joystick Root");
        joystickRoot.setParent(joystickParent);
        joystickRoot.layer = joystickParent.layer;
        joystickRoot.createComponent("ScreenTransform");
        this.joystickComponent = joystickRoot.createComponent(JoystickComponent_1.JoystickComponent.getTypeName());
        this.joystickComponent.setConfig(joystickConfig);
    }
    enable() {
        if (!isNull(this.joystickComponent)) {
            this.joystickComponent.enable();
        }
    }
    disable() {
        if (!isNull(this.joystickComponent)) {
            this.joystickComponent.disable();
        }
    }
    onDestroy() {
        if (!isNull(this.joystickComponent)) {
            this.joystickComponent.getSceneObject()
                .destroy();
        }
        if (!isNull(this.uiCameraProvider)) {
            this.uiCameraProvider.getSceneObject()
                .destroy();
        }
    }
    getDirection() {
        if (!this.isActive()) {
            return null;
        }
        const joystickDirection = this.joystickComponent.getDirection();
        const cameraTransform = this.trackingCameraSO.getTransform();
        const rightDirection = cameraTransform.right.projectOnPlane(this.movablePlane)
            .normalize();
        const rotation = quat.lookAt(this.movablePlane, rightDirection.cross(this.movablePlane));
        const projectedDirection = rotation.multiplyVec3(new vec3(joystickDirection.x, joystickDirection.y, 0));
        return projectedDirection.uniformScale(-Math.sqrt(joystickDirection.length));
    }
    get sensitivity() {
        return this.joystickInputControlConfig.sensitivity;
    }
    getJoystickParent() {
        if (this.joystickInputControlConfig.joystickPositionTypeConfig === JoystickPositionTypeConfig.Custom) {
            return this.joystickInputControlConfig.joystickParent;
        }
        this.uiCameraProvider = UiCameraProvider_1.UiCameraProvider.instance;
        const uiCameraLayout = this.uiCameraProvider.uiCameraLayout;
        switch (this.joystickInputControlConfig.joystickPositionTypeConfig) {
            case JoystickPositionTypeConfig.Left:
                return uiCameraLayout.leftInputControlSpace;
            case JoystickPositionTypeConfig.Right:
                return uiCameraLayout.rightInputControlSpace;
            case JoystickPositionTypeConfig.Free:
                return uiCameraLayout.leftInputControlSpace;
        }
    }
    isActive() {
        return !isNull(this.joystickComponent)
            && !isNull(this.joystickComponent.getSceneObject())
            && this.joystickComponent.getSceneObject().enabled
            && this.joystickComponent.getSceneObject().isEnabledInHierarchy;
    }
}
exports.JoystickInputControl = JoystickInputControl;
let _Void = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var _Void = _classThis = class extends _classSuper {
        constructor() {
            super();
        }
        __initialize() {
            super.__initialize();
        }
    };
    __setFunctionName(_classThis, "_Void");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        _Void = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return _Void = _classThis;
})();
exports._Void = _Void;
//# sourceMappingURL=JoystickInputControl.js.map