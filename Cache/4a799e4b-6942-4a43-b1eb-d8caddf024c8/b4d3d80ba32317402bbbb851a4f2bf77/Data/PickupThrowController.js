// PickupThrowController.js
// Version: 1.0.0
// Event: Initialized
// Description: Allows picking up and throwing the car using hand gestures

//@input SceneObject kart {"hint": "The car object to pick up and throw"}
//@input SceneObject leftHandInteractor {"hint": "Left hand interactor object"}
//@input SceneObject rightHandInteractor {"hint": "Right hand interactor object"}

// No external modules needed - using built-in components

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
    // Use a simpler approach - detect when hands are close to the kart
    print("PickupThrowController: Gesture events setup completed");
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
    // Try different methods to get hand position
    
    // Method 1: Check if HandInteractor has a HandTracking component
    if (script.rightHandInteractor) {
        var handTracking = script.rightHandInteractor.getComponent("Component.HandTracking3D");
        if (handTracking && handTracking.isTracking()) {
            var wrist = handTracking.getWrist();
            if (wrist) {
                return wrist.position;
            }
        }
        
        // Fallback to transform position
        var pos = script.rightHandInteractor.getTransform().getWorldPosition();
        if (pos.x !== 0 || pos.y !== 0 || pos.z !== 40) { // Not the default static position
            return pos;
        }
    }
    
    // Try left hand
    if (script.leftHandInteractor) {
        var handTracking = script.leftHandInteractor.getComponent("Component.HandTracking3D");
        if (handTracking && handTracking.isTracking()) {
            var wrist = handTracking.getWrist();
            if (wrist) {
                return wrist.position;
            }
        }
        
        // Fallback to transform position
        var pos = script.leftHandInteractor.getTransform().getWorldPosition();
        if (pos.x !== 0 || pos.y !== 0 || pos.z !== 40) { // Not the default static position
            return pos;
        }
    }
    
    return null;
}

// Debug counter to limit print frequency
var debugCounter = 0;

// Update loop
var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
    if (!kartBody) {
        if (debugCounter % 60 === 0) { // Print every 60 frames (about 1 second)
            print("PickupThrowController: ERROR - No kartBody found!");
        }
        debugCounter++;
        return;
    }
    
    var handPos = getPalmWorldPosition();
    var kartPos = kartTransform.getWorldPosition();
    
    // Debug logging every 60 frames
    if (debugCounter % 60 === 0) {
        print("PickupThrowController DEBUG:");
        print("  HandPos: " + (handPos ? handPos.toString() : "null"));
        print("  KartPos: " + kartPos.toString());
        print("  RightHandInteractor: " + (script.rightHandInteractor ? "assigned" : "null"));
        print("  LeftHandInteractor: " + (script.leftHandInteractor ? "assigned" : "null"));
        print("  IsHeld: " + isHeld);
        
        // Additional debug for hand tracking components
        if (script.rightHandInteractor) {
            var rightHT = script.rightHandInteractor.getComponent("Component.HandTracking3D");
            print("  RightHand HandTracking3D: " + (rightHT ? "found" : "not found"));
            if (rightHT) {
                print("  RightHand isTracking: " + rightHT.isTracking());
            }
        }
        if (script.leftHandInteractor) {
            var leftHT = script.leftHandInteractor.getComponent("Component.HandTracking3D");
            print("  LeftHand HandTracking3D: " + (leftHT ? "found" : "not found"));
            if (leftHT) {
                print("  LeftHand isTracking: " + leftHT.isTracking());
            }
        }
    }
    debugCounter++;
    
    if (handPos) {
        var distance = handPos.distance(kartPos);
        
        // Debug distance every 60 frames
        if (debugCounter % 60 === 1) {
            print("  Distance: " + distance.toFixed(2));
        }
        
        // Check if hand is close enough to grab (within 10 units)
        if (distance < 10.0 && !isHeld) {
            print("PickupThrowController: Hand close enough, starting hold!");
            startHold();
        }
        
        // If holding, move kart with hand
        if (isHeld) {
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
        
        // Check if hand moved away to release (distance > 15 units while holding)
        if (isHeld && distance > 15.0) {
            print("PickupThrowController: Hand moved away, ending hold!");
            endHold();
        }
    } else {
        // No hand position detected
        if (debugCounter % 60 === 2) {
            print("PickupThrowController: No hand position detected");
        }
    }
});
