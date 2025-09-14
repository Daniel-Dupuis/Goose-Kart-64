// WheelController.js
// Version: 0.1.0
// Event: Initialized
// Description: Apply torque to the wheels when pressing the RT (right trigger) on BLE game controller
// without dragging any objects

//@input Physics.BodyComponent[] wheelBodys {"hint": "All 4 wheels: [RF, LF, RB, LB]"}
//@input Physics.HingeConstraintComponent[] frontWheelHinges {"hint": "Front wheel hinge constraints for steering: [RF, LF]"}
//@input float force
//@input float maxSteerAngle = 30.0 {"hint": "Maximum steering angle in degrees"}
//@input float steerSpeed = 5.0 {"hint": "Speed of steering rotation (higher = faster steering)"}
//@input Component.ScriptComponent draggable

// Import GameController modules
const { GameController } = require("GameController.lspkg/GameController");

var gameController = GameController.getInstance();

// Store current steering angles for smooth interpolation
var currentSteerAngles = [];

// Setup game controller scanning
var onStartEvent = script.createEvent("OnStartEvent");
onStartEvent.bind(function() {
    gameController.scanForControllers();
    
    // Initialize steering angles array
    if (script.frontWheelHinges) {
        for (var i = 0; i < script.frontWheelHinges.length; i++) {
            currentSteerAngles[i] = 0.0;
        }
    }
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

function ApplyMovementAndSteering(forwardTrigger, reverseTrigger, steerValue) {
    // Calculate net torque (forward - reverse)
    var netTorque = (forwardTrigger - reverseTrigger) * script.force;
    
    // Apply torque to all wheels for movement
    for (var i = 0; i < script.wheelBodys.length; i++) {
        script.wheelBodys[i].addRelativeTorque(new vec3(0.0, 0.0, netTorque), Physics.ForceMode.Acceleration);
    }
    
    // Apply smooth steering by gradually rotating front wheels
    if (script.frontWheelTransforms && script.frontWheelTransforms.length >= 2) {
        var targetSteerAngle = steerValue * script.maxSteerAngle; // Target angle in degrees
        var deltaTime = getDeltaTime();
        
        // Apply smooth steering rotation to front wheels
        for (var i = 0; i < script.frontWheelTransforms.length; i++) {
            var frontWheel = script.frontWheelTransforms[i];
            if (frontWheel && i < currentSteerAngles.length) {
                // Smoothly interpolate toward target angle
                var angleDiff = targetSteerAngle - currentSteerAngles[i];
                var maxChange = script.steerSpeed * deltaTime * 60.0; // Scale by frame rate
                
                // Clamp the change to prevent overshooting
                if (Math.abs(angleDiff) < maxChange) {
                    currentSteerAngles[i] = targetSteerAngle;
                } else {
                    currentSteerAngles[i] += (angleDiff > 0 ? maxChange : -maxChange);
                }
                
                // Apply the smoothed rotation while preserving wheel spinning
                var steerRotation = quat.angleAxis(currentSteerAngles[i] * Math.PI / 180.0, vec3.up());
                
                // Get current rotation to preserve spinning motion
                var currentRotation = frontWheel.getTransform().getLocalRotation();
                
                // Extract the current X and Z rotation (spinning motion) and combine with Y steering
                var currentEuler = currentRotation.toEulerAngles();
                var combinedRotation = quat.fromEulerAngles(currentEuler.x, currentSteerAngles[i] * Math.PI / 180.0, currentEuler.z);
                
                frontWheel.getTransform().setLocalRotation(combinedRotation);
            }
        }
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