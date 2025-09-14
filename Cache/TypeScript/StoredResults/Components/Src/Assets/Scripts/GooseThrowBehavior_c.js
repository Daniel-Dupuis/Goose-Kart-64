if (script.onAwake) {
    script.onAwake();
    return;
}
function checkUndefined(property, showIfData) {
    for (var i = 0; i < showIfData.length; i++) {
        if (showIfData[i][0] && script[showIfData[i][0]] != showIfData[i][1]) {
            return;
        }
    }
    if (script[property] == undefined) {
        throw new Error("Input " + property + " was not provided for the object " + script.getSceneObject().name);
    }
}
// @input SceneObject targetObject
// @input Component.AudioComponent audio
// @input Asset.Material targetOutlineMaterial {"hint":"Material used to outline the object on hover (optional)"}
// @input Component.RenderMeshVisual meshVisual
// @input float overrideMass {"hint":"Optional: override physics mass. Leave 0 to keep existing mass/density from scene."}
// @input int minHoldDurationMs = 120 {"hint":"Minimum time (ms) you must hold before release applies a throw. Prevents accidental flicks."}
// @input Component.ScriptComponent drivingScript {"hint":"Optional: driving script component to disable while holding (e.g., WheelController)."}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../Modules/Src/Assets/Scripts/GooseThrowBehavior");
Object.setPrototypeOf(script, Module.GooseThrowBehavior.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("targetOutlineMaterial", []);
    checkUndefined("overrideMass", []);
    checkUndefined("minHoldDurationMs", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
