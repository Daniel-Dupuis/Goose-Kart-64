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
exports.UiCameraProvider = void 0;
var __selfType = requireType("./UiCameraProvider");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const UiCameraLayout_1 = require("./UiCameraLayout");
const Utils_1 = require("../../Utils/Utils");
var assignRenderLayerRecursively = Utils_1.Utils.assignRenderLayerRecursively;
let UiCameraProvider = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var UiCameraProvider = _classThis = class extends _classSuper {
        __initialize() {
            super.__initialize();
            this.uiCameraPrefab = this.uiCameraPrefab;
            this.renderLayer = LayerSet.makeUnique();
            UiCameraProvider._instance = this;
            const uiCameraObject = this.uiCameraPrefab.instantiate(this.getSceneObject());
            this.uiCameraLayout = uiCameraObject.getComponent(UiCameraLayout_1.UiCameraLayout.getTypeName());
            const uiCamera = this.uiCameraLayout.uiCamera;
            assignRenderLayerRecursively(this.getSceneObject(), this.renderLayer);
            uiCamera.renderLayer = this.renderLayer;
            uiCamera.renderTarget = global.scene.liveTarget;
        }
        static get instance() {
            var _a;
            return (_a = UiCameraProvider._instance) !== null && _a !== void 0 ? _a : UiCameraProvider.instantiate();
        }
        addUiElement(uiElementSO, parent) {
            assignRenderLayerRecursively(uiElementSO, this.renderLayer);
            uiElementSO.setParent(parent);
        }
        constructor() {
            super();
            this.uiCameraPrefab = this.uiCameraPrefab;
            this.renderLayer = LayerSet.makeUnique();
            UiCameraProvider._instance = this;
            const uiCameraObject = this.uiCameraPrefab.instantiate(this.getSceneObject());
            this.uiCameraLayout = uiCameraObject.getComponent(UiCameraLayout_1.UiCameraLayout.getTypeName());
            const uiCamera = this.uiCameraLayout.uiCamera;
            assignRenderLayerRecursively(this.getSceneObject(), this.renderLayer);
            uiCamera.renderLayer = this.renderLayer;
            uiCamera.renderTarget = global.scene.liveTarget;
        }
        static instantiate() {
            const scriptObject = global.scene.createSceneObject("UI Camera Provider");
            UiCameraProvider._instance = scriptObject.createComponent(UiCameraProvider.getTypeName());
            return UiCameraProvider._instance;
        }
    };
    __setFunctionName(_classThis, "UiCameraProvider");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UiCameraProvider = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UiCameraProvider = _classThis;
})();
exports.UiCameraProvider = UiCameraProvider;
//# sourceMappingURL=UiCameraProvider.js.map