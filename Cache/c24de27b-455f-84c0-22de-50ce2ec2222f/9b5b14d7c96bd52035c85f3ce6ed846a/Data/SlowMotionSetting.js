// SlowMotionSetting.js
// Version: 0.1.0
// Event: Initialized
// Description: Start/Stop car simulation using Y button on BLE game controller
//@input Physics.WorldComponent worldComponent
//@input float slowStep {"widget":"slider", "min":0, "max":10, "step":0.1}
//@input float slowTime {"widget":"slider", "min":0, "max":10, "step":0.11}

// Import GameController modules
const { GameController } = require("GameController.lspkg/GameController");
const { ButtonStateKey } = require("GameController.lspkg/Scripts/ButtonState");

var disableSlowMotionStep = 1.0;
var disableSlowMotionTime = 1.0;
var worldSettings = script.worldComponent.worldSettings;
var gameController = GameController.getInstance();
var isSimulationRunning = true; // Start with simulation running

// Expose original functions for backward compatibility
script.enableSlowMotion = enableSlowMotion;
script.disableSlowMotion = disableSlowMotion;

// Register Y button press handler for simulation control
var onStartEvent = script.createEvent("OnStartEvent");
onStartEvent.bind(function() {
    gameController.scanForControllers();
    gameController.onButtonStateChanged(
        ButtonStateKey.y,
        function(pressed) {
            if (pressed) {
                toggleSimulation();
            }
        }
    );
});

function toggleSimulation() {
    if (isSimulationRunning) {
        stopSimulation();
    } else {
        startSimulation();
    }
}

function startSimulation() {
    worldSettings.slowDownStep = disableSlowMotionStep;
    worldSettings.slowDownTime = disableSlowMotionTime;
    isSimulationRunning = true;
    print("Car simulation started");
}

function stopSimulation() {
    worldSettings.slowDownStep = 0.0; // Stop physics simulation
    worldSettings.slowDownTime = 0.0;
    isSimulationRunning = false;
    print("Car simulation stopped");
}

function enableSlowMotion() {
    worldSettings.slowDownStep = script.slowStep;
    worldSettings.slowDownTime = script.slowTime; 
}

function disableSlowMotion() {
    worldSettings.slowDownStep = disableSlowMotionStep;
    worldSettings.slowDownTime = disableSlowMotionTime; 
}
