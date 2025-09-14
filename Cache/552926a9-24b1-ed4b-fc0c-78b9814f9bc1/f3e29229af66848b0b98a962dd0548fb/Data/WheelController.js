// WheelController.js
// Version: 0.1.0
// Event: Initialized
// Description: Apply torque to the wheels when pressing the RT (right trigger) on BLE game controller
// without dragging any objects

//@input Physics.BodyComponent[] wheelBodys
//@input float force
//@input Physics.BodyComponent carBody {"hint": "Main car body for steering forces"}
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
    
    // Use RT (right trigger) for torque - triggers range from 0.0 to 1.0
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

function ApplyMovementAndSteering(triggerValue, steerValue) {
    // Apply forward/backward movement using wheel torque
    if (triggerValue > 0.0) {
        var baseForce = script.force * triggerValue;
        for (var i = 0; i < script.wheelBodys.length; i++) {
            script.wheelBodys[i].addRelativeTorque(new vec3(0.0, 0.0, baseForce), Physics.ForceMode.Acceleration);
        }
    }
    
    // Apply steering using lateral force on the car body
    if (Math.abs(steerValue) > 0.0 && script.carBody) {
        var steerForce = script.turnForce * steerValue;
        
        // Apply lateral force to the car body for steering
        // Positive steerValue = turn right, so apply force to the left side
        var lateralForce = new vec3(-steerForce, 0.0, 0.0);
        script.carBody.addRelativeForce(lateralForce, Physics.ForceMode.Force);
        
        // Also apply a small torque around Y-axis for rotation
        var rotationTorque = new vec3(0.0, steerForce * 0.3, 0.0);
        script.carBody.addRelativeTorque(rotationTorque, Physics.ForceMode.Force);
    }
}

// Keep the original AddTorque function for backward compatibility
function AddTorque(triggerValue) {   
    // Scale torque based on trigger pressure (0.0 to 1.0)
    var scaledForce = script.force * triggerValue;
    for (var i = 0; i<script.wheelBodys.length; i++) {
        script.wheelBodys[i].addRelativeTorque(new vec3(0.0, 0.0, scaledForce), Physics.ForceMode.Acceleration);
    }
}