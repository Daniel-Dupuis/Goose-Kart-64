// WheelController.js
// Version: 0.2.0
// Event: Initialized
// Description: Apply torque to the wheels when pressing the RT (right trigger) on BLE game controller
// and steering with left joystick horizontal axis (lx) for turning functionality

//@input Physics.BodyComponent[] wheelBodys
//@input float force
//@input float turnForce {"hint": "Force multiplier for turning (steering)"}
//@input Component.ScriptComponent draggable

// Import GameController modules
const { GameController } = require("GameController.lspkg/GameController");

var gameController = GameController.getInstance();

// Setup game controller scanning
var onStartEvent = script.createEvent("OnStartEvent");
onStartEvent.bind(function() {
    gameController.scanForControllers();
});

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
    var buttonState = gameController.getButtonState();
    if (!buttonState) {
        return;
    }
    
    // Use RT (right trigger) for forward/backward movement - triggers range from 0.0 to 1.0
    var triggerValue = buttonState.rt || 0.0;
    
    // Use left joystick horizontal axis (lx) for steering - ranges from -1.0 to 1.0
    var steerValue = buttonState.lx || 0.0;
    
    // Apply dead zones
    if (Math.abs(triggerValue) < 0.1) {
        triggerValue = 0.0;
    }
    if (Math.abs(steerValue) < 0.1) {
        steerValue = 0.0;
    }
    
    // Apply movement and steering
    if (triggerValue > 0.0 || Math.abs(steerValue) > 0.0) {
        ApplyMovementAndSteering(triggerValue, steerValue);
    }
});

function AddTorque(triggerValue) {   
    // Scale torque based on trigger pressure (0.0 to 1.0)
    var scaledForce = script.force * triggerValue;
    for (var i = 0; i<script.wheelBodys.length; i++) {
        script.wheelBodys[i].addRelativeTorque(new vec3(0.0, 0.0, scaledForce), Physics.ForceMode.Acceleration);
    }
}