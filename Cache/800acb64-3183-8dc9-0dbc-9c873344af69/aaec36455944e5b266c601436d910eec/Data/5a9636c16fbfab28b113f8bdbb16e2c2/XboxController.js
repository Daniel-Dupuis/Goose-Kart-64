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
exports.XboxController = void 0;
const BaseController_1 = require("../Scripts/BaseController");
const RegisteredControllers_1 = require("./RegisteredControllers");
const DEVICE_NAME_SUBSTRING = "Xbox"; //substring of device name to identify Xbox controllers
let XboxController = (() => {
    let _classDecorators = [RegisteredControllers_1.RegisterController];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseController_1.BaseController;
    var XboxController = _classThis = class extends _classSuper {
        parseInput(buf) {
            const hat = buf[12] & 0x0f;
            return {
                lx: this.normalize(this.decode(buf[0], buf[1])),
                ly: this.normalize(this.decode(buf[2], buf[3])),
                rx: this.normalize(this.decode(buf[4], buf[5])),
                ry: this.normalize(this.decode(buf[6], buf[7])),
                a: (buf[13] & 0x01) !== 0,
                b: (buf[13] & 0x02) !== 0,
                x: (buf[13] & 0x08) !== 0,
                y: (buf[13] & 0x10) !== 0,
                lb: (buf[13] & 0x04) !== 0,
                rb: (buf[13] & 0x20) !== 0,
                lt: (buf[8] + (buf[9] << 8)) / 1023,
                rt: (buf[10] + (buf[11] << 8)) / 1023,
                dUp: [1, 2, 8].includes(hat),
                dDown: [4, 5, 6].includes(hat),
                dLeft: [6, 7, 8].includes(hat),
                dRight: [2, 3, 4].includes(hat),
                view: (buf[14] & 0x04) !== 0,
                start: (buf[14] & 0x08) !== 0,
                home: (buf[14] & 0x10) !== 0,
                lclick: (buf[14] & 0x20) !== 0,
                rclick: (buf[14] & 0x40) !== 0,
            };
        }
        supportsRumble() {
            return true;
        }
        getRumbleBuffer(power, duration) {
            const MOTOR_LEFT = 1 << 3; // bit3
            const MOTOR_RIGHT = 1 << 2; // bit2
            const payload = new Uint8Array([
                MOTOR_LEFT | MOTOR_RIGHT, // 0x0C
                power, // left strength (0–100)
                power, // right strength (0–100)
                0, // shake motor (unused)
                0, // central motor (unused)
                duration, // duration in 10ms units
                0, // no pause
                0, // no repeat (play once)
            ]);
            return payload;
        }
        getDeviceNameSubstring() {
            return DEVICE_NAME_SUBSTRING;
        }
    };
    __setFunctionName(_classThis, "XboxController");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        XboxController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return XboxController = _classThis;
})();
exports.XboxController = XboxController;
//# sourceMappingURL=XboxController.js.map