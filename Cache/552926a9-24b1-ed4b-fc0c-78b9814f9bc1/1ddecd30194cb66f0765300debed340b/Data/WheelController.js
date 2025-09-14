// WheelController.js
// Version: 0.1.0
// Event: Initialized
// Description: Apply torque to the wheels when pressing the RT (right trigger) on BLE game controller
// without dragging any objects

//@input Physics.BodyComponent[] wheelBodys {"hint": "All 4 wheels: [RF, LF, RB, LB]"}
//@input Transform[] frontWheelTransforms {"hint": "Front wheel transforms for steering: [RF, LF]"}
//@input float force
//@input float maxSteerAngle = 30.0 {"hint": "Maximum steering angle in degrees"}
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
    
    // Use RT (right trigger) for forward torque - triggers range from 0.0 to 1.0
    var forwardTrigger = buttonState.rt || 0.0;
    
    // Use LT (left trigger) for reverse torque - triggers range from 0.0 to 1.0
    var reverseTrigger = buttonState.lt || 0.0;
    
    // Use left joystick horizontal axis (lx) for steering - ranges from -1.0 to 1.0
    var steerValue = buttonState.lx || 0.0;
    
    // Apply dead zones
    if (Math.abs(forwardTrigger) < 0.1) {
        forwardTrigger = 0.0;
    }
    if (Math.abs(reverseTrigger) < 0.1) {
        reverseTrigger = 0.0;
    }
    if (Math.abs(steerValue) < 0.1) {
        steerValue = 0.0;
    }
    
    // Apply movement and steering
    ApplyMovementAndSteering(forwardTrigger, reverseTrigger, steerValue);
});

function ApplyMovementAndSteering(triggerValue, steerValue) {
    // Calculate base forward force from trigger
    var baseForce = script.force * triggerValue;
    
    // Calculate steering differential - positive steerValue = turn right
    var steerForce = script.turnForce * steerValue;
    
    // Apply differential torque to wheels for realistic car-like turning
    // Wheel arrangement: [0=RF, 1=LF, 2=RB, 3=LB] (Right Front, Left Front, Right Back, Left Back)
    
    for (var i = 0; i < script.wheelBodys.length; i++) {
        var wheelForce = baseForce;
        
        // Apply steering differential based on wheel position
        if (i === 0 || i === 2) {
            // Right wheels (RF=0, RB=2) - increase force when turning right
            wheelForce += steerForce * 0.5;
        } else if (i === 1 || i === 3) {
            // Left wheels (LF=1, LB=3) - decrease force when turning right
            wheelForce += steerForce * -0.5;
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