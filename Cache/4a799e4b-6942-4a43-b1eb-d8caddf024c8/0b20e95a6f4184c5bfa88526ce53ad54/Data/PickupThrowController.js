// PickupThrowController.js
// Version: 1.0.0
// Event: Initialized
// Description: Allows picking up and throwing the car using hand gestures

//@input SceneObject kart {"hint": "The car object to pick up and throw"}
//@input SceneObject leftHandInteractor {"hint": "Left hand interactor object"}
//@input SceneObject rightHandInteractor {"hint": "Right hand interactor object"}

// Import required modules
const InteractionKit = require("SpectaclesInteractionKit/Core/InteractionKit/InteractionKit");

// State variables
var isHeld = false;
var kartBody;
var kartTransform;
var handPositionHistory = [];
var maxHistoryLength = 10;
var originalDynamic = true;

// Initialize components
var onStartEvent = script.createEvent("OnStartEvent");
onStartEvent.bind(function() {
    if (!script.kart) {
        print("PickupThrowController: ERROR - No kart object assigned!");
        return;
    }
    
    kartBody = script.kart.getComponent("Physics.BodyComponent");
    kartTransform = script.kart.getTransform();
    
    if (!kartBody) {
        print("PickupThrowController: ERROR - Kart has no Physics.BodyComponent!");
        return;
    }
    
    originalDynamic = kartBody.dynamic;
    
    // Setup gesture events
    setupGestureEvents();
});

function setupGestureEvents() {
    // Right hand grab begin
    GestureModule.getGrabBeginEvent("right").add(function() {
        startHold();
    });
    
    // Right hand grab end
    GestureModule.getGrabEndEvent("right").add(function() {
        endHold();
    });
    
    // Left hand grab begin (optional - for left-handed users)
    GestureModule.getGrabBeginEvent("left").add(function() {
        startHold();
    });
    
    // Left hand grab end
    GestureModule.getGrabEndEvent("left").add(function() {
        endHold();
    });
}

function startHold() {
    if (!kartBody || isHeld) return;
    
    print("PickupThrowController: Starting hold");
    isHeld = true;
    kartBody.dynamic = false; // Stop physics from moving it
    handPositionHistory = []; // Clear history
}

function endHold() {
    if (!kartBody || !isHeld) return;
    
    print("PickupThrowController: Ending hold");
    isHeld = false;
    kartBody.dynamic = originalDynamic; // Restore physics
    
    // Calculate throw velocity from hand movement history
    var throwVelocity = calculateThrowVelocity();
    if (throwVelocity.length > 0.1) {
        kartBody.velocity = throwVelocity;
        print("PickupThrowController: Throwing with velocity: " + throwVelocity.toString());
    }
}

function calculateThrowVelocity() {
    if (handPositionHistory.length < 2) {
        return new vec3(0, 0, 0);
    }
    
    // Use the last few positions to calculate velocity
    var recentPositions = handPositionHistory.slice(-5);
    var totalVelocity = new vec3(0, 0, 0);
    var validSamples = 0;
    
    for (var i = 1; i < recentPositions.length; i++) {
        var deltaPos = recentPositions[i].position.sub(recentPositions[i-1].position);
        var deltaTime = recentPositions[i].time - recentPositions[i-1].time;
        
        if (deltaTime > 0) {
            var velocity = deltaPos.uniformScale(1.0 / deltaTime);
            totalVelocity = totalVelocity.add(velocity);
            validSamples++;
        }
    }
    
    if (validSamples > 0) {
        var avgVelocity = totalVelocity.uniformScale(1.0 / validSamples);
        // Scale the velocity for better throwing feel
        return avgVelocity.uniformScale(30.0);
    }
    
    return new vec3(0, 0, 0);
}

function getPalmWorldPosition() {
    // Try to get position from right hand interactor first, then left
    if (script.rightHandInteractor) {
        return script.rightHandInteractor.getTransform().getWorldPosition();
    } else if (script.leftHandInteractor) {
        return script.leftHandInteractor.getTransform().getWorldPosition();
    }
    
    return null;
}

// Update loop
var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
    if (!isHeld || !kartBody) return;
    
    var handPos = getPalmWorldPosition();
    if (handPos) {
        // Move kart to hand position with slight offset
        var offset = new vec3(0, 5, 0); // Slightly above the hand
        kartTransform.setWorldPosition(handPos.add(offset));
        
        // Store hand position for velocity calculation
        var currentTime = getTime();
        handPositionHistory.push({
            position: handPos,
            time: currentTime
        });
        
        // Limit history length
        if (handPositionHistory.length > maxHistoryLength) {
            handPositionHistory.shift();
        }
    }
});
