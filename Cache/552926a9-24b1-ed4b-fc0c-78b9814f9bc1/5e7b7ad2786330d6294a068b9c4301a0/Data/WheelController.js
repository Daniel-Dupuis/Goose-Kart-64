// WheelController.js
// Version: 0.1.0
// Event: Initialized
// Description: Apply torque to the wheels when pressing the RT (right trigger) on BLE game controller
// without dragging any objects

//@input Physics.BodyComponent[] wheelBodys
//@input float force
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
        if (Math.random() < 0.01) {
            print("WheelController: ButtonState is null");
        }
        return;
    }
    
    // Debug: Log button state properties occasionally
    if (Math.random() < 0.01) {
        print("WheelController ButtonState properties: " + Object.keys(buttonState).join(", "));
        print("RT value: " + (buttonState.rt || "undefined"));
        print("Right trigger alternatives: " + (buttonState.rightTrigger || "undefined") + ", " + (buttonState.r2 || "undefined"));
    }
    
    // Try different possible property names for right trigger
    var triggerValue = buttonState.rt || buttonState.rightTrigger || buttonState.r2 || 0.0;
    if (triggerValue < 0.1) { // Dead zone
        return;
    }
 
    if (script.draggable.isDragging && script.draggable.isDragging()) {      
        return;
    }
    
    print("WheelController: Applying torque with RT value: " + triggerValue);
    AddTorque(triggerValue);
});

function AddTorque(triggerValue) {   
    // Scale torque based on trigger pressure (0.0 to 1.0)
    var scaledForce = script.force * triggerValue;
    for (var i = 0; i<script.wheelBodys.length; i++) {
        script.wheelBodys[i].addRelativeTorque(new vec3(0.0, 0.0, scaledForce), Physics.ForceMode.Acceleration);
    }
}