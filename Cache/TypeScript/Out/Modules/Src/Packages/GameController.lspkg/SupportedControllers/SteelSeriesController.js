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
exports.SteelSeriesController = void 0;
const BaseController_1 = require("../Scripts/BaseController");
const RegisteredControllers_1 = require("./RegisteredControllers");
const DEVICE_NAME_SUBSTRING = "Stratus"; //substring of device name to identify Steel Series Stratus controllers
let SteelSeriesController = (() => {
    let _classDecorators = [RegisteredControllers_1.RegisterController];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseController_1.BaseController;
    var SteelSeriesController = _classThis = class extends _classSuper {
        parseInput(buf) {
            const hat = buf[8]; // 0 = neutral, 1–8 = clockwise from up
            return {
                lx: (buf[0] - 128) / 127,
                ly: (buf[1] - 128) / 127,
                rx: (buf[2] - 128) / 127,
                ry: (buf[3] - 128) / 127,
                a: (buf[6] & 0x01) !== 0,
                b: (buf[6] & 0x02) !== 0,
                x: (buf[6] & 0x08) !== 0,
                y: (buf[6] & 0x10) !== 0,
                lt: buf[4] / 255,
                rt: buf[5] / 255,
                lb: (buf[6] & 0x40) !== 0,
                rb: (buf[6] & 0x80) !== 0,
                dUp: hat === 1 || hat === 2 || hat === 8,
                dRight: hat === 2 || hat === 3 || hat === 4,
                dDown: hat === 4 || hat === 5 || hat === 6,
                dLeft: hat === 6 || hat === 7 || hat === 8,
                view: (buf[7] & 0x04) !== 0,
                start: (buf[7] & 0x08) !== 0,
                home: (buf[7] & 0x10) !== 0,
                lclick: (buf[7] & 0x20) !== 0,
                rclick: (buf[7] & 0x40) !== 0,
            };
        }
        supportsRumble() {
            return false;
        }
        getRumbleBuffer(power, duration) {
            return new Uint8Array([0]);
        }
        getDeviceNameSubstring() {
            return DEVICE_NAME_SUBSTRING;
        }
    };
    __setFunctionName(_classThis, "SteelSeriesController");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SteelSeriesController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SteelSeriesController = _classThis;
})();
exports.SteelSeriesController = SteelSeriesController;
//# sourceMappingURL=SteelSeriesController.js.map