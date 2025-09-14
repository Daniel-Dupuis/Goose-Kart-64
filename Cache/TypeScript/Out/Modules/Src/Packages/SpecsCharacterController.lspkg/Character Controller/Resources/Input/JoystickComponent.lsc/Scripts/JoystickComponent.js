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
exports.JoystickComponent = void 0;
var __selfType = requireType("./JoystickComponent");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const Event_1 = require("./Event");
const JoystickComponentConfig_1 = require("./JoystickComponentConfig");
const APPEAR_ANIMATION_TIME = 0.2;
const MIN_SHOW_HIDE_ANIMATION_SCALE = 0.95;
const MAX_SHOW_HIDE_ANIMATION_SCALE = 1;
let JoystickComponent = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var JoystickComponent = _classThis = class extends _classSuper {
        __initialize() {
            var _a;
            super.__initialize();
            this.config = this.config;
            this.controlDotPrefab = this.controlDotPrefab;
            this.controlPlatePrefab = this.controlPlatePrefab;
            this.releaseJoystickAnimationLerpFactor = this.releaseJoystickAnimationLerpFactor;
            this.interactingTouchId = null;
            this.lastDirection = vec2.zero();
            this.animationDisposable = null;
            this.touchEventsDisposable = null;
            this.directionChangeEvent = new Event_1.Event();
            this.directionUpdateEvent = new Event_1.Event();
            this.myST = (_a = this.getSceneObject()
                .getComponent("ScreenTransform")) !== null && _a !== void 0 ? _a : this.getSceneObject()
                .createComponent("ScreenTransform");
        }
        get isFreePosition() {
            return this.config.position === JoystickComponentConfig_1.JoystickComponentPositionConfig.Free;
        }
        get controlPlateObject() {
            var _a;
            return (_a = this.controlPlateInteractionComponent) === null || _a === void 0 ? void 0 : _a.getSceneObject();
        }
        get controlDotObject() {
            var _a;
            return (_a = this.controlDotST) === null || _a === void 0 ? void 0 : _a.getSceneObject();
        }
        constructor() {
            var _a;
            super();
            this.config = this.config;
            this.controlDotPrefab = this.controlDotPrefab;
            this.controlPlatePrefab = this.controlPlatePrefab;
            this.releaseJoystickAnimationLerpFactor = this.releaseJoystickAnimationLerpFactor;
            this.interactingTouchId = null;
            this.lastDirection = vec2.zero();
            this.animationDisposable = null;
            this.touchEventsDisposable = null;
            this.directionChangeEvent = new Event_1.Event();
            this.directionUpdateEvent = new Event_1.Event();
            this.myST = (_a = this.getSceneObject()
                .getComponent("ScreenTransform")) !== null && _a !== void 0 ? _a : this.getSceneObject()
                .createComponent("ScreenTransform");
        }
        setConfig(config) {
            this.config = config;
            setRenderLayerAndRenderOrderForWholeHierarchy(this.getSceneObject(), this.getSceneObject().layer, this.config.renderOrder);
            this.clearTouchEvents();
            this.observeTouchEvents();
            this.reset();
        }
        reset() {
            var _a, _b, _c, _d;
            this.interactingTouchId = null;
            this.lastDirection = vec2.zero();
            (_a = this.animationDisposable) === null || _a === void 0 ? void 0 : _a.dispose();
            (_b = this.controlDotST) === null || _b === void 0 ? void 0 : _b.anchors.setCenter(vec2.zero());
            if (this.isFreePosition) {
                (_c = this.opacityController) === null || _c === void 0 ? void 0 : _c.setOpacity(0);
                if (this.controlPlateObject) {
                    this.controlPlateObject.enabled = false;
                }
                if (this.controlDotObject) {
                    this.controlDotObject.enabled = false;
                }
            }
            else {
                (_d = this.opacityController) === null || _d === void 0 ? void 0 : _d.setOpacity(1);
            }
        }
        enable() {
            if (this.controlPlateObject) {
                this.controlPlateObject.enabled = true;
            }
            if (this.controlDotObject) {
                this.controlDotObject.enabled = true;
            }
        }
        disable() {
            if (this.controlPlateObject) {
                this.controlPlateObject.enabled = false;
            }
            if (this.controlDotObject) {
                this.controlDotObject.enabled = false;
            }
        }
        show(showWithAnimation = true) {
            this.disposeAnimation();
            this.controlPlateObject.enabled = true;
            this.controlDotObject.enabled = true;
            if (showWithAnimation) {
                this.showAnimation();
            }
            else {
                this.opacityController.setOpacity(this.isFreePosition ? 0 : 1);
            }
        }
        hide(hideWithAnimation = true) {
            this.disposeAnimation();
            const disable = () => {
                this.controlPlateObject.enabled = false;
                this.controlDotObject.enabled = false;
            };
            hideWithAnimation ? this.hideAnimation(disable) : disable();
        }
        getDirection() {
            return this.applySensitivityToDirection();
        }
        addOnDirectionChangeListener(listener) {
            this.directionChangeEvent.add(listener);
            return { dispose: () => this.directionChangeEvent.remove(listener) };
        }
        removeOnDirectionChangeListener(listener) {
            this.directionChangeEvent.remove(listener);
        }
        addOnDirectionUpdateListener(listener) {
            this.directionUpdateEvent.add(listener);
            return { dispose: () => this.directionChangeEvent.remove(listener) };
        }
        removeOnDirectionUpdateListener(listener) {
            this.directionUpdateEvent.remove(listener);
        }
        onDestroy() {
            var _a, _b;
            this.clearTouchEvents();
            (_a = this.controlPlateObject) === null || _a === void 0 ? void 0 : _a.destroy();
            (_b = this.controlDotObject) === null || _b === void 0 ? void 0 : _b.destroy();
        }
        onAwake() {
            this.instantiateScene();
            this.setupPlateExtentsDotAreaIfNeeded();
            this.observeTouchEvents();
            const dotAlignmentUpdateEvent = this.createEvent("UpdateEvent");
            dotAlignmentUpdateEvent.bind(this.dotAlignmentUpdate.bind(this));
            const updateEvent = this.createEvent("UpdateEvent");
            updateEvent.bind((event) => {
                this.directionUpdateEvent.trigger({
                    direction: this.applySensitivityToDirection(),
                    deltaTime: event.getDeltaTime(),
                });
            });
            this.createEvent("OnDisableEvent")
                .bind(() => this.reset());
            this.createEvent("OnDestroyEvent")
                .bind(() => this.onDestroy());
        }
        instantiateScene() {
            this.controlPlateInteractionComponent = this.controlPlatePrefab
                .instantiate(this.getSceneObject())
                .getComponent("InteractionComponent");
            this.controlDotST = this.controlDotPrefab
                .instantiate(this.getSceneObject())
                .getComponent("ScreenTransform");
            this.opacityController = createOpacityController([this.getSceneObject()]);
            setRenderLayerAndRenderOrderForWholeHierarchy(this.getSceneObject(), this.getSceneObject().layer, this.config.renderOrder);
        }
        showAnimation() {
            this.controlDotObject.enabled = true;
            this.controlPlateObject.enabled = true;
            this.disposeAnimation();
            const scale = this.getTransform()
                .getLocalScale();
            this.animationDisposable = startTween(this, APPEAR_ANIMATION_TIME, p => {
                this.opacityController.setOpacity(p);
                this.getTransform()
                    .setLocalScale(scale.uniformScale(MIN_SHOW_HIDE_ANIMATION_SCALE
                    + (MAX_SHOW_HIDE_ANIMATION_SCALE - MIN_SHOW_HIDE_ANIMATION_SCALE) * p));
            }, () => {
                this.getTransform()
                    .setLocalScale(scale);
            });
        }
        hideAnimation(onDispose) {
            this.disposeAnimation();
            const scale = this.getTransform()
                .getLocalScale();
            this.animationDisposable = startTween(this, APPEAR_ANIMATION_TIME, p => {
                this.opacityController.setOpacity(1 - p);
                this.getTransform()
                    .setLocalScale(scale.uniformScale(MAX_SHOW_HIDE_ANIMATION_SCALE
                    - (MAX_SHOW_HIDE_ANIMATION_SCALE - MIN_SHOW_HIDE_ANIMATION_SCALE) * p));
            }, () => {
                this.getTransform()
                    .setLocalScale(scale);
                onDispose === null || onDispose === void 0 ? void 0 : onDispose();
            }, () => {
                this.controlDotObject.enabled = false;
                this.controlPlateObject.enabled = false;
            });
        }
        clearTouchEvents() {
            var _a;
            (_a = this.touchEventsDisposable) === null || _a === void 0 ? void 0 : _a.dispose();
        }
        observeTouchEvents() {
            const allDisposable = [];
            if (this.isFreePosition) {
                this.opacityController.setOpacity(0);
                const freePositionTouchStartCallback = (touchPosition, touchId) => {
                    if (this.interactingTouchId === null) {
                        this.showAnimation();
                        this.myST.anchors.setCenter(this.myST.screenPointToParentPoint(touchPosition));
                        this.onTouchStart(touchId, touchPosition);
                    }
                };
                if (this.config.interactiveArea) {
                    const eventRegistration = this.config.interactiveArea.onTouchStart.add((eventData) => {
                        freePositionTouchStartCallback(eventData.position, eventData.touchId);
                    });
                    allDisposable.push({
                        dispose: () => this.config.interactiveArea.onTouchStart.remove(eventRegistration),
                    });
                }
                else {
                    const touchStart = this.createEvent("TouchStartEvent");
                    touchStart.bind((eventData) => freePositionTouchStartCallback(eventData.getTouchPosition(), eventData.getTouchId()));
                    allDisposable.push(createSceneEventDisposable(this, touchStart));
                }
            }
            else {
                const eventRegistration = this.controlPlateInteractionComponent.onTouchStart.add(eventData => this.onTouchStart(eventData.touchId, eventData.position));
                allDisposable.push({
                    dispose: () => this.controlPlateInteractionComponent.onTouchStart.remove(eventRegistration),
                });
            }
            const touchMove = this.createEvent("TouchMoveEvent");
            touchMove.bind(this.onTouchMove.bind(this));
            allDisposable.push(createSceneEventDisposable(this, touchMove));
            const touchEnd = this.createEvent("TouchEndEvent");
            touchEnd.bind(this.onTouchEnd.bind(this));
            allDisposable.push(createSceneEventDisposable(this, touchEnd));
            this.touchEventsDisposable = {
                dispose: () => allDisposable.forEach((obj) => obj.dispose()),
            };
        }
        dotAlignmentUpdate(event) {
            const deltaTime = event.getDeltaTime();
            const FPS_FACTOR = 30;
            const factor = Math.pow(this.releaseJoystickAnimationLerpFactor, deltaTime * FPS_FACTOR);
            this.controlDotST.anchors.setCenter(vec2.lerp(this.controlDotST.anchors.getCenter(), this.lastDirection, factor));
        }
        onTouchStart(touchId, touchPosition) {
            if (this.interactingTouchId === null) {
                this.interactingTouchId = touchId;
                this.updateDirectionFromTouchPosition(touchPosition);
            }
        }
        onTouchMove(event) {
            if (event.getTouchId() === this.interactingTouchId) {
                this.updateDirectionFromTouchPosition(event.getTouchPosition());
            }
        }
        onTouchEnd(event) {
            if (event.getTouchId() === this.interactingTouchId) {
                this.interactingTouchId = null;
                this.onDirectionChange(vec2.zero());
                if (this.isFreePosition) {
                    this.hideAnimation();
                }
            }
        }
        updateDirectionFromTouchPosition(position) {
            const localPosition = this.controlDotST.screenPointToParentPoint(position);
            this.onDirectionChange(localPosition.lengthSquared > 1 ? localPosition.normalize() : localPosition);
        }
        onDirectionChange(direction) {
            const withinDeadZone = direction.lengthSquared < Math.pow(this.config.deadZone, 2);
            this.lastDirection = withinDeadZone ? vec2.zero() : direction;
            this.directionChangeEvent.trigger({ direction: this.applySensitivityToDirection() });
        }
        setupPlateExtentsDotAreaIfNeeded() {
            const plateImage = this.controlPlateObject.getComponent("Image");
            if (!plateImage.extentsTarget) {
                const extentsTarget = global.scene.createSceneObject("plateImageExtentsTarget");
                extentsTarget.setParent(this.controlPlateObject);
                plateImage.extentsTarget = extentsTarget.createComponent("ScreenTransform");
            }
            this.controlDotObject.setParent(plateImage.extentsTarget.getSceneObject());
        }
        disposeAnimation() {
            var _a;
            (_a = this.animationDisposable) === null || _a === void 0 ? void 0 : _a.dispose();
            this.animationDisposable = null;
        }
        applySensitivityToDirection() {
            return this.lastDirection.uniformScale(this.config.sensitivity);
        }
    };
    __setFunctionName(_classThis, "JoystickComponent");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        JoystickComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return JoystickComponent = _classThis;
})();
exports.JoystickComponent = JoystickComponent;
// Extensions
function* flatSubtree(rootSO) {
    yield rootSO;
    for (const child of rootSO.children) {
        yield* flatSubtree(child);
    }
}
function* flatSubtreeMaterialPasses(rootSO) {
    for (const child of flatSubtree(rootSO)) {
        for (const materialMeshVisual of child.getComponents("MaterialMeshVisual")) {
            for (const material of materialMeshVisual.materials) {
                for (let i = 0; i < material.getPassCount(); ++i) {
                    yield material.getPass(i);
                }
            }
        }
    }
}
function setRenderLayerAndRenderOrderForWholeHierarchy(so, layer, renderOrder) {
    for (const child of flatSubtree(so)) {
        child.layer = layer;
        for (const visual of child.getComponents("Visual")) {
            visual.setRenderOrder(renderOrder);
        }
    }
}
function createOpacityController(rootsSO) {
    const opacitySetters = [];
    for (const root of rootsSO) {
        for (const pass of flatSubtreeMaterialPasses(root)) {
            const setter = createOpacitySetter(pass);
            setter && opacitySetters.push(setter);
        }
    }
    function createOpacitySetter(pass) {
        var _a, _b;
        return (_b = (_a = fromFloat("opacity")) !== null && _a !== void 0 ? _a : fromFloat("alpha")) !== null && _b !== void 0 ? _b : fromColor("baseColor");
        function fromColor(propertyName) {
            if (pass[propertyName] == null) {
                return null;
            }
            const initial = pass[propertyName].w;
            return (value) => {
                const color = pass[propertyName];
                color.w = initial * value;
                pass[propertyName] = color;
            };
        }
        function fromFloat(propertyName) {
            if (pass[propertyName] == null) {
                return null;
            }
            const initial = pass[propertyName];
            return (value) => {
                pass[propertyName] = initial * value;
            };
        }
    }
    return {
        setOpacity(opacity) {
            for (const setter of opacitySetters) {
                setter(opacity);
            }
        },
    };
}
function startTween(hostingScript, time, progressCallback, onDispose, onComplete) {
    const dispose = () => {
        hostingScript.removeEvent(updateEvent);
        onDispose === null || onDispose === void 0 ? void 0 : onDispose();
    };
    const updateEvent = hostingScript.createEvent("UpdateEvent");
    let elapsedTime = 0;
    updateEvent.bind(event => {
        elapsedTime += event.getDeltaTime();
        if (elapsedTime >= time) {
            progressCallback(1);
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
            dispose();
        }
        else {
            progressCallback(elapsedTime / time);
        }
    });
    progressCallback(0);
    return { dispose };
}
function createSceneEventDisposable(script, event) {
    return {
        dispose: () => {
            event.enabled = false;
            script.removeEvent(event);
        },
    };
}
//# sourceMappingURL=JoystickComponent.js.map