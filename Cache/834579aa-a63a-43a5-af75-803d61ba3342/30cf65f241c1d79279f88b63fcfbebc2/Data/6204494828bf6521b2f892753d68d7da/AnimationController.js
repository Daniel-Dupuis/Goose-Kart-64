"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationController = void 0;
var __selfType = requireType("./AnimationController");
function component(target) { target.getTypeName = function () { return __selfType; }; }
let AnimationController = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var AnimationController = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.kick = this.kick;
            this.punch = this.punch;
            this.jump = this.jump;
            this.walk = this.walk;
            this.run = this.run;
            this.idle = this.idle;
            this.characterController = this.characterController;
            this.idleClip = null;
            this.jumpClip = null;
            this.kickClip = null;
            this.punchClip = null;
            this.walkClip = null;
            this.runClip = null;
            this.clips = [];
            this.currClip = null;
        }
        __initialize() {
            super.__initialize();
            this.kick = this.kick;
            this.punch = this.punch;
            this.jump = this.jump;
            this.walk = this.walk;
            this.run = this.run;
            this.idle = this.idle;
            this.characterController = this.characterController;
            this.idleClip = null;
            this.jumpClip = null;
            this.kickClip = null;
            this.punchClip = null;
            this.walkClip = null;
            this.runClip = null;
            this.clips = [];
            this.currClip = null;
        }
        onAwake() {
            this.createEvent("OnStartEvent").bind(this.onStart.bind(this));
        }
        onStart() {
            this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
            this.animationPlayer =
                this.getSceneObject().createComponent("AnimationPlayer");
            this.createAllAnimationClips();
            // set idle clip as the default animation
            this.currClip = this.idleClip;
        }
        playJumpAnimation() {
            this.playSingleAnimation(this.jumpClip);
        }
        playKickAnimation() {
            this.playSingleAnimation(this.kickClip);
        }
        playPunchAnimation() {
            this.playSingleAnimation(this.punchClip);
        }
        playSingleAnimation(clip) {
            if (this.animationPlayer != null) {
                print("Playing: " + clip.name);
                this.setNewClip(clip);
                this.animationPlayer.playClip(clip.name);
            }
        }
        createAllAnimationClips() {
            //looping animations
            this.idleClip = this.createLoopedClip("Idle", this.idle);
            this.walkClip = this.createLoopedClip("Walk", this.walk);
            this.runClip = this.createLoopedClip("Run", this.run);
            //one shot animations
            this.jumpClip = this.createSingleClip("Jump", this.jump);
            this.kickClip = this.createSingleClip("Kick", this.kick);
            this.punchClip = this.createSingleClip("Punch", this.punch);
        }
        createLoopedClip(name, animAsset) {
            var clip = AnimationClip.createFromAnimation(name, animAsset);
            clip.weight = 0;
            this.animationPlayer.addClip(clip);
            this.animationPlayer.playClip(clip.name);
            this.clips.push(clip);
            return clip;
        }
        createSingleClip(name, animAsset) {
            var clip = AnimationClip.createFromAnimation(name, animAsset);
            clip.playbackMode = PlaybackMode.Single;
            this.animationPlayer.addClip(clip);
            this.clips.push(clip);
            return clip;
        }
        setNewClip(clip) {
            this.currClip = clip;
        }
        blendClips() {
            for (const clip of this.clips) {
                const weight = clip.name != this.currClip.name ? 0 : 1;
                clip.weight = MathUtils.lerp(clip.weight, weight, getDeltaTime() * 7);
            }
            //MAKE SURE IDLE IS ALWAYS WEIGHT 1
            this.idleClip.weight = 1;
        }
        isClipAlmostDone(clip) {
            return (this.animationPlayer.getClipCurrentTime(clip.name) > clip.duration - 0.4);
        }
        onUpdate() {
            this.blendClips();
            //return to idle after single clip is done
            if (this.currClip.playbackMode === PlaybackMode.Single) {
                //block movement unless jumping
                if (this.currClip.name != this.jumpClip.name) {
                    this.characterController.stopMovement();
                }
                if (this.isClipAlmostDone(this.currClip)) {
                    this.setNewClip(this.idleClip);
                }
                return;
            }
            var maxSpeed = this.characterController.getMoveSpeed();
            var currSpeed = this.characterController.getVelocity().length;
            //check for idle
            if (currSpeed < 5) {
                this.setNewClip(this.idleClip);
            }
            //check for walk
            if (currSpeed > 5 && currSpeed < maxSpeed / 2) {
                this.setNewClip(this.walkClip);
            }
            //check for run
            if (currSpeed > maxSpeed / 2 && this.runClip.weight < 0.5) {
                this.setNewClip(this.runClip);
            }
        }
    };
    __setFunctionName(_classThis, "AnimationController");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnimationController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnimationController = _classThis;
})();
exports.AnimationController = AnimationController;
//# sourceMappingURL=AnimationController.js.map