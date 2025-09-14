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
exports.SceneController = void 0;
var __selfType = requireType("./SceneController");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const PlacementSettings_1 = require("Surface Placement.lspkg/Scripts/PlacementSettings");
const ButtonState_1 = require("GameController.lspkg/Scripts/ButtonState");
const GameController_1 = require("GameController.lspkg/GameController");
const SurfacePlacementController_1 = require("Surface Placement.lspkg/Scripts/SurfacePlacementController");
let SceneController = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var SceneController = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.objectVisuals = this.objectVisuals;
            this.characterController = this.characterController;
            this.animationController = this.animationController;
            this.cameraObj = this.cameraObj;
            this.placementSettingMode = this.placementSettingMode;
            this.transform = null;
            this.camTrans = null;
            this.surfacePlacement = SurfacePlacementController_1.SurfacePlacementController.getInstance();
            this.gameController = GameController_1.GameController.getInstance();
        }
        __initialize() {
            super.__initialize();
            this.objectVisuals = this.objectVisuals;
            this.characterController = this.characterController;
            this.animationController = this.animationController;
            this.cameraObj = this.cameraObj;
            this.placementSettingMode = this.placementSettingMode;
            this.transform = null;
            this.camTrans = null;
            this.surfacePlacement = SurfacePlacementController_1.SurfacePlacementController.getInstance();
            this.gameController = GameController_1.GameController.getInstance();
        }
        onAwake() {
            this.camTrans = this.cameraObj.getTransform();
            this.transform = this.getSceneObject().getTransform();
            this.createEvent("OnStartEvent").bind(this.onStart.bind(this));
            this.objectVisuals.enabled = false;
            //HACK: EDITOR TEST:
            this.createEvent("TapEvent").bind(() => {
                this.JumpButtonDown(true);
                //this.KickButtonDown(true);
                //this.PunchButtonDown(true);
            });
        }
        onStart() {
            this.startPlacement();
            this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
            this.gameController.scanForControllers();
            //register button presses
            this.gameController.onButtonStateChanged(ButtonState_1.ButtonStateKey.a, this.JumpButtonDown.bind(this));
            this.gameController.onButtonStateChanged(ButtonState_1.ButtonStateKey.x, this.PunchButtonDown.bind(this));
            this.gameController.onButtonStateChanged(ButtonState_1.ButtonStateKey.b, this.KickButtonDown.bind(this));
            this.gameController.onButtonStateChanged(ButtonState_1.ButtonStateKey.y, this.sendRumble.bind(this));
        }
        sendRumble(pressed) {
            if (pressed) {
                this.gameController.sendRumble(20, 10);
            }
        }
        JumpButtonDown(pressed) {
            if (pressed) {
                this.animationController.playJumpAnimation();
            }
        }
        PunchButtonDown(pressed) {
            if (pressed) {
                this.animationController.playPunchAnimation();
            }
        }
        KickButtonDown(pressed) {
            if (pressed) {
                this.animationController.playKickAnimation();
            }
        }
        startPlacement() {
            this.objectVisuals.enabled = false;
            var placementSettings = new PlacementSettings_1.PlacementSettings(PlacementSettings_1.PlacementMode.HORIZONTAL);
            if (this.placementSettingMode == 0) {
                placementSettings = new PlacementSettings_1.PlacementSettings(PlacementSettings_1.PlacementMode.NEAR_SURFACE, true, // use surface adjustment widget
                vec3.zero(), // offset in cm of widget from surface center
                this.onSliderUpdated.bind(this) // callback from widget height changes
                );
            }
            this.surfacePlacement.startSurfacePlacement(placementSettings, (pos, rot) => {
                this.onSurfaceDetected(pos, rot);
            });
        }
        resetPlacement() {
            this.surfacePlacement.stopSurfacePlacement();
            this.startPlacement();
        }
        onSliderUpdated(pos) {
            this.transform.setWorldPosition(pos);
        }
        onSurfaceDetected(pos, rot) {
            this.objectVisuals.enabled = true;
            this.transform.setWorldPosition(pos);
            this.transform.setWorldRotation(rot);
            this.characterController.setPosition(pos);
            this.characterController.setInputType(global.deviceInfoSystem.isEditor() ? 1 : 0);
        }
        onUpdate() {
            var buttonState = this.gameController.getButtonState();
            if (!buttonState) {
                return;
            }
            //set button states in update instead of on value value changed since vertical and horizontal would come in at different times
            var moveSpeed = new vec2(Math.abs(buttonState.lx), Math.abs(buttonState.ly)).distance(vec2.zero()); //0 - 1
            var joystickMoveDirection = new vec3(buttonState.lx, 0, buttonState.ly).normalize();
            // Convert joystick input into world space relative to camera’s facing direction
            var moveDir = this.camTrans
                .getWorldTransform()
                .multiplyDirection(joystickMoveDirection)
                .normalize();
            if (moveSpeed < 0.15) {
                moveSpeed = 0;
                moveDir = vec3.zero();
            }
            this.characterController.move(moveDir);
            this.characterController.setTargetSpeedModifier(moveSpeed);
        }
    };
    __setFunctionName(_classThis, "SceneController");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SceneController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SceneController = _classThis;
})();
exports.SceneController = SceneController;
//# sourceMappingURL=SceneController.js.map