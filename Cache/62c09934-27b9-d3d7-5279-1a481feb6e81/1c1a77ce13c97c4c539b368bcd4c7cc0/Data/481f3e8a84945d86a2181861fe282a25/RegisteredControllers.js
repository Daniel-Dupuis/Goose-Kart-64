"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = RegisterController;
exports.GetRegisteredControllers = GetRegisteredControllers;
const registry = [];
function RegisterController(ctor) {
    registry.push(ctor);
    return ctor;
}
function GetRegisteredControllers() {
    return registry;
}
// // **** ADD IMPORTS TO NEW CONTROLLERS HERE! *****
require("./XboxController");
require("./SteelSeriesController");
//# sourceMappingURL=RegisteredControllers.js.map