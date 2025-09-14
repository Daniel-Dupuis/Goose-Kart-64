// WheelController.js
// Version: 0.3.0
// Event: Initialized
// Description: Arcade-style car controller that applies forces directly to the car body
// for responsive, game-like driving physics

//@input Physics.BodyComponent car {"hint": "Main car body for applying forces and torque"}
//@input float accelerationForce = 1000.0 {"hint": "Forward/reverse acceleration force"}
//@input float turnTorque = 500.0 {"hint": "Turning torque strength"}
//@input float maxSpeed = 50.0 {"hint": "Maximum car speed"}
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

function ApplyMovementAndSteering(forwardTrigger, reverseTrigger, steerValue) {
    if (!script.car) {
        return;
    }
    
    // Calculate net acceleration input (forward - reverse)
    var accelerationInput = forwardTrigger - reverseTrigger;
    
    // Apply forward/reverse force to car body
    if (Math.abs(accelerationInput) > 0.0) {
        // Get current velocity to check speed limit
        var currentVelocity = script.car.velocity;
        var currentSpeed = currentVelocity.length;
        
        // Only apply force if under max speed or trying to slow down
        if (currentSpeed < script.maxSpeed || (accelerationInput > 0 && currentVelocity.dot(script.car.getTransform().forward) < 0) || (accelerationInput < 0 && currentVelocity.dot(script.car.getTransform().forward) > 0)) {
            var forwardForce = script.car.getTransform().forward.uniformScale(accelerationInput * script.accelerationForce);
            script.car.addForce(forwardForce, Physics.ForceMode.Force);
        }
    }
    
    // Apply turning torque to car body
    if (Math.abs(steerValue) > 0.0) {
        var turningTorque = new vec3(0.0, steerValue * script.turnTorque, 0.0);
        script.car.addRelativeTorque(turningTorque, Physics.ForceMode.Force);
    }
}