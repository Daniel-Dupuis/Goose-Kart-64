// WheelController.js
// Version: 0.1.0
// Event: Initialized
// Description: Apply torque to the wheels when pressing the RT (right trigger) on BLE game controller
// without dragging any objects

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
    // Calculate base forward force from trigger
    var baseForce = script.force * triggerValue;
    
    // Calculate steering differential - positive steerValue = turn right
    var steerForce = script.turnForce * steerValue;
    
    // Apply differential torque to wheels for realistic car-like turning
    // Assuming wheels are arranged as: [front-left, front-right, rear-left, rear-right]
    // or similar arrangement where even indices are left wheels, odd indices are right wheels
    
    for (var i = 0; i < script.wheelBodys.length; i++) {
        var wheelForce = baseForce;
        
        // Apply steering differential
        if (i % 2 === 0) {
            // Left wheels (even indices) - reduce force when turning right
            wheelForce += steerForce * -0.5;
        } else {
            // Right wheels (odd indices) - increase force when turning right
            wheelForce += steerForce * 0.5;
        }
        
        // Apply the calculated torque to each wheel
        script.wheelBodys[i].addRelativeTorque(new vec3(0.0, 0.0, wheelForce), Physics.ForceMode.Acceleration);
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