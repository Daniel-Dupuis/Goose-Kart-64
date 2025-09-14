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
    print("WheelController: OnStart - Scanning for controllers...");
    print("WheelController: Car input assigned: " + (script.car ? "YES" : "NO"));
    if (script.car) {
        print("WheelController: Car object name: " + script.car.getSceneObject().name);
        print("WheelController: Car transform: " + script.car.getTransform().getWorldPosition().toString());
    }
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
    
    // Debug: Log raw input values when any input is detected
    if (forwardTrigger > 0 || reverseTrigger > 0 || Math.abs(steerValue) > 0) {
        print("WheelController: Raw inputs - RT:" + forwardTrigger + " LT:" + reverseTrigger + " LX:" + steerValue);
    }
    
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
    
    // Debug: Log processed input values when any input remains after dead zone
    if (forwardTrigger > 0 || reverseTrigger > 0 || Math.abs(steerValue) > 0) {
        print("WheelController: After deadzone - Forward:" + forwardTrigger + " Reverse:" + reverseTrigger + " Steer:" + steerValue);
    }
    
    // Apply movement and steering
    ApplyMovementAndSteering(forwardTrigger, reverseTrigger, steerValue);
});

function ApplyMovementAndSteering(forwardTrigger, reverseTrigger, steerValue) {
    if (!script.car) {
        print("WheelController: ERROR - No car physics body assigned!");
        return;
    }
    
    print("WheelController: ApplyMovementAndSteering called - Car: " + script.car.getSceneObject().name);
    
    // Calculate net acceleration input (forward - reverse)
    var accelerationInput = forwardTrigger - reverseTrigger;
    
    // Apply forward/reverse force to car body
    if (Math.abs(accelerationInput) > 0.0) {
        // Get current velocity to check speed limit
        var currentVelocity = script.car.velocity;
        var currentSpeed = currentVelocity.length;
        
        print("WheelController: Acceleration input: " + accelerationInput + ", Current speed: " + currentSpeed);
        
        // Only apply force if under max speed or trying to slow down
        if (currentSpeed < script.maxSpeed || (accelerationInput > 0 && currentVelocity.dot(script.car.getTransform().forward) < 0) || (accelerationInput < 0 && currentVelocity.dot(script.car.getTransform().forward) > 0)) {
            var forwardForce = script.car.getTransform().forward.uniformScale(accelerationInput * script.accelerationForce);
            print("WheelController: Applying force: " + forwardForce.toString() + " (magnitude: " + forwardForce.length + ")");
            script.car.addForce(forwardForce, Physics.ForceMode.Force);
        } else {
            print("WheelController: Speed limit reached, not applying force");
        }
    }
    
    // Apply turning torque to car body
    if (Math.abs(steerValue) > 0.0) {
        var turningTorque = new vec3(0.0, steerValue * script.turnTorque, 0.0);
        print("WheelController: Applying torque: " + turningTorque.toString() + " to car: " + script.car.getSceneObject().name);
        script.car.addRelativeTorque(turningTorque, Physics.ForceMode.Force);
    }
}