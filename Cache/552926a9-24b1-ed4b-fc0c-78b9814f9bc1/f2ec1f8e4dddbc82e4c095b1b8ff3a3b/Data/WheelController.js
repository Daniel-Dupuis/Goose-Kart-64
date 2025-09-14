// WheelController.js
// Version: 0.1.0
// Event: Initialized
// Description: Apply torque to the wheels when pressing the Y button on BLE game controller
// without dragging any objects

//@input Physics.BodyComponent[] wheelBodys
//@input float force
//@input Component.ScriptComponent draggable

// Import GameController modules
const { GameController } = require("GameController.lspkg/GameController");
const { ButtonStateKey } = require("GameController.lspkg/Scripts/ButtonState");

var gameController = GameController.getInstance();
var isYButtonPressed = false;

// Register Y button press handler
var onStartEvent = script.createEvent("OnStartEvent");
onStartEvent.bind(function() {
    gameController.scanForControllers();
    gameController.onButtonStateChanged(
        ButtonStateKey.y,
        function(pressed) {
            isYButtonPressed = pressed;
        }
    );
});

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
    if (!isYButtonPressed) {
        return;
    }
 
    if (script.draggable.isDragging && script.draggable.isDragging()) {      
        return;
    }
    AddTorque();
});

function AddTorque() {   
    for (var i = 0; i<script.wheelBodys.length; i++) {
        script.wheelBodys[i].addRelativeTorque(new vec3(0.0, 0.0, script.force), Physics.ForceMode.Acceleration);
    }
}