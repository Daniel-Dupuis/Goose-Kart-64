// WheelController.js
// Version: 0.3.0
// Event: Initialized
// Description: Arcade-style car controller that applies forces directly to the car body
// for responsive, game-like driving physics

//@input Physics.BodyComponent carBody {"hint": "Main car body for applying forces and torque"}
//@input float accelerationForce = 1000.0 {"hint": "Forward/reverse acceleration force"}
//@input float turnTorque = 500.0 {"hint": "Turning torque strength"}
//@input float maxSpeed = 50.0 {"hint": "Maximum car speed"}
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
    
    // Initialize and configure hinge motors for steering
    // if (script.frontWheelConstraints) {
    //     for (var i = 0; i < script.frontWheelConstraints.length; i++) {
    //         var constraint = script.frontWheelConstraints[i].constraint;
    //         var motorSettings = constraint.motorSettings;
            
    //         // Configure motor for angle targeting
    //         motorSettings.enabled = true;
    //         motorSettings.maxImpulse = 10000;
    //         motorSettings.targetType = HingeMotorType.AngleTarget;
    //         motorSettings.targetValue = 30; // Start at center
            
    //         // Apply the settings back
    //         constraint.motorSettings = motorSettings;
            
    //         // currentSteerAngles[i] = 0.0;
    //     }
    // }
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
    
    // Apply steering using hinge motor angle targets
    if (script.frontWheelConstraints && script.frontWheelConstraints.length >= 2) {
        var targetSteerAngle = steerValue * script.maxSteerAngle; // Target angle in degrees
        
        // Apply steering to front wheel hinge motors
        // for (var i = 0; i < script.frontWheelConstraints.length; i++) {
        //     var constraintComponent = script.frontWheelConstraints[i];
        //     if (constraintComponent) {
        //         var constraint = constraintComponent.constraint;
        //         var motorSettings = constraint.motorSettings;
                
        //         // Set the target angle for the motor (in degrees)
        //         motorSettings.targetValue = targetSteerAngle;
                
        //         // Apply the updated settings
        //         constraint.motorSettings = motorSettings;
        //     }
        // }
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