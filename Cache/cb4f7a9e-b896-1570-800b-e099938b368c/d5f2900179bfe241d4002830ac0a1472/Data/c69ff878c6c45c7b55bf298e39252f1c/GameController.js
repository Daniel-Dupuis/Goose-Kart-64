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
exports.GameController = void 0;
const RegisteredControllers_1 = require("./SupportedControllers/RegisteredControllers");
const Singleton_1 = require("./Decorators/Singleton");
const HID_SERVICE_UUID = "0x1812";
const REPORT_INPUT_UUID = "0x2A4D";
const bluetoothModule = require("LensStudio:BluetoothCentralModule");
/**
 * Singleton class for managing Bluetooth HID game controller connections and input handling.
 * Supports scanning, connecting, and receiving input from various game controllers.
 *
 * @example
 * ```typescript
 * const controller = GameController.getInstance();
 * await controller.scanForControllers();
 *
 * // Listen for button presses
 * controller.onButtonStateChanged('A', (pressed) => {
 *   console.log('A button pressed:', pressed);
 * });
 * ```
 */
let GameController = (() => {
    let _classDecorators = [Singleton_1.Singleton];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var GameController = _classThis = class {
        /**
         * Initializes the GameController with default Bluetooth scan settings.
         * Sets up the HID service filter and scan configuration.
         */
        constructor() {
            /** Map of button listeners for handling input events */
            this.buttonListeners = new Map();
            /** Bluetooth scan filter for HID devices */
            this.scanFilter = new Bluetooth.ScanFilter();
            /** Bluetooth scan settings configuration */
            this.scanSetting = new Bluetooth.ScanSettings();
            this.scanFilter.serviceUUID = HID_SERVICE_UUID;
            this.scanSetting.uniqueDevices = true;
            this.scanSetting.timeoutSeconds = 10000;
        }
        /**
         * Scans for available Bluetooth HID game controllers.
         * Automatically connects to the first compatible controller found.
         *
         * @returns Promise that resolves when scan completes
         *
         * @example
         * ```typescript
         * const controller = GameController.getInstance();
         * await controller.scanForControllers();
         * ```
         */
        async scanForControllers() {
            this.log("starting scan...");
            await bluetoothModule.startScan([this.scanFilter], this.scanSetting, (result) => {
                this.log("Found device: " + result.deviceName);
                this.connectGATT(result);
            });
            this.log("scan complete...");
        }
        /**
         * Establishes GATT connection with a discovered Bluetooth controller.
         * Identifies controller type, sets up characteristics, and registers for notifications.
         *
         * @param scanResult - The scan result containing device information
         * @private
         */
        async connectGATT(scanResult) {
            this.log("Attempting connection...");
            //find controller type:
            for (const controller of (0, RegisteredControllers_1.GetRegisteredControllers)()) {
                if (scanResult.deviceName.includes(controller.prototype.getDeviceNameSubstring())) {
                    this.currController = new controller();
                }
            }
            var gatt = await bluetoothModule.connectGatt(scanResult.deviceAddress);
            this.log("connected...");
            gatt.onConnectionStateChangedEvent.add(async (connectionState) => {
                if (connectionState.state == Bluetooth.ConnectionState.Disconnected) {
                    this.log("Device disconnected: " + scanResult.deviceName);
                    this.scanForControllers();
                }
                if (connectionState.state == Bluetooth.ConnectionState.Connected) {
                    bluetoothModule.stopScan();
                    this.log("Connected to device: " + scanResult.deviceName);
                    var desiredService = gatt.getService(HID_SERVICE_UUID);
                    //there are multiple 2A4D's here, register for notify on one and write to other that has correct descriptor
                    desiredService.getCharacteristics().forEach(async (c) => {
                        if (c.uuid.includes(REPORT_INPUT_UUID)) {
                            this.log("Found characteristic: " + c.uuid + " : " + c.properties);
                            if (c.properties.includes(Bluetooth.CharacteristicProperty.Notify)) {
                                this.log("REGISTERING FOR NOTIFICATIONS: " + c.uuid);
                                await c.registerNotifications((buf) => {
                                    if (this.currController) {
                                        this.currController.onStateUpdate(buf, (btn, value) => {
                                            // Call all listeners for this button
                                            const listeners = this.buttonListeners.get(btn);
                                            if (listeners) {
                                                for (const fn of listeners) {
                                                    fn(value);
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        this.log("Controller mapping not found for: " + scanResult.deviceName);
                                    }
                                });
                            }
                            else {
                                c.getDescriptors().forEach(async (d) => {
                                    const readVal = (await d.readValue());
                                    const reportId = readVal[0]; // e.g. 1 or 3
                                    const reportType = readVal[1]; // 1=Input, 2=Output, 3=Feature
                                    if (reportId == 3 && reportType == 2) {
                                        this.rumbleCharacteristic = c; // store for later use
                                    }
                                });
                            }
                        }
                    });
                }
                this.log("Connected .... " + scanResult.deviceName);
            });
        }
        /**
         * Sends rumble/haptic feedback to the connected controller.
         *
         * @param power - Rumble intensity (0-255, where 255 is maximum)
         * @param durationMs - Duration of rumble effect in milliseconds (default: 1000ms)
         *
         * @example
         * ```typescript
         * // Light rumble for 500ms
         * controller.sendRumble(100, 500);
         *
         * // Strong rumble for 1 second
         * controller.sendRumble(255);
         * ```
         */
        sendRumble(power, durationMs = 1000) {
            if (this.rumbleCharacteristic && this.currController) {
                if (!this.currController.supportsRumble()) {
                    print("This controller does not support rumble");
                    return;
                }
                this.rumbleCharacteristic.writeValueWithoutResponse(this.currController.getRumbleBuffer(power, durationMs));
                this.log("Power: " + power + " Duration: " + durationMs);
            }
        }
        /**
         * Registers a callback function to listen for specific button state changes.
         *
         * @param key - The button key to listen for (e.g., 'A', 'B', 'X', 'Y', etc.)
         * @param handler - Callback function that receives the button's new state
         * @returns Unsubscribe function to remove the listener
         *
         * @example
         * ```typescript
         * // Listen for A button presses
         * const unsubscribe = controller.onButtonStateChanged('A', (pressed) => {
         *   if (pressed) {
         *     console.log('A button pressed!');
         *   }
         * });
         *
         * // Later, remove the listener
         * unsubscribe();
         * ```
         */
        onButtonStateChanged(key, handler) {
            if (!this.buttonListeners.has(key)) {
                this.buttonListeners.set(key, []);
            }
            const listeners = this.buttonListeners.get(key);
            listeners.push(handler);
            // Unsubscribe function
            return () => {
                const index = listeners.indexOf(handler);
                if (index !== -1) {
                    listeners.splice(index, 1);
                }
            };
        }
        /**
         * Gets the current button state from the connected controller.
         *
         * @returns The current ButtonState object, or null if no controller is connected
         *
         * @example
         * ```typescript
         * const state = controller.getButtonState();
         * if (state) {
         *   console.log('A button is pressed:', state.A);
         *   console.log('Left stick X:', state.leftStickX);
         * }
         * ```
         */
        getButtonState() {
            if (this.currController) {
                return this.currController.getButtonState();
            }
            return null;
        }
        /**
         * Logs debug messages with a consistent prefix.
         *
         * @param message - The message to log
         * @private
         */
        log(message) {
            print("BLE TEST: " + message);
        }
    };
    __setFunctionName(_classThis, "GameController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GameController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GameController = _classThis;
})();
exports.GameController = GameController;
//# sourceMappingURL=GameController.js.map