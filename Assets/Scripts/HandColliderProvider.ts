import { SIK } from "SpectaclesInteractionKit.lspkg/SIK";

/**
 * @component
 * Attaches a simple physics ColliderComponent to follow the hand (index/thumb midpoint)
 * so Grabbable objects can detect overlap. Name the SceneObject "ColliderTargetProvider"
 * or set Grabbable.handColliderName to match this object's name.
 */
@component
export class HandColliderProvider extends BaseScriptComponent {
    @input("int")
    @widget(new ComboBoxWidget([
        new ComboBoxItem("Right", 0),
        new ComboBoxItem("Left", 1),
    ]))
    hand: number = 0; // 0=Right, 1=Left

    @input("float")
    radius: number = 3.0; // cm

    private collider: ColliderComponent;
    private t: Transform;

    private handInput = SIK.HandInputData;
    private getTrackedHand() { return this.handInput.getHand(this.hand === 1 ? 'left' : 'right'); }

    onAwake() {
        this.t = this.getTransform();
        // Ensure a collider exists
        this.collider = this.sceneObject.getComponent("ColliderComponent") as ColliderComponent;
        if (!this.collider) {
            this.collider = this.sceneObject.createComponent("ColliderComponent") as ColliderComponent;
        }
        // Configure collider as sphere around hand pinch area
        (this.collider.shape as any).type = "Sphere";
        (this.collider.shape as any).radius = this.radius;
        // Overlap filter
        this.collider.overlapFilter.includeIntangible = true;
        if ((this.collider.overlapFilter as any).includeDynamic !== undefined) { (this.collider.overlapFilter as any).includeDynamic = true; }
        if ((this.collider.overlapFilter as any).includeStatic !== undefined) { (this.collider.overlapFilter as any).includeStatic = true; }
        // Visualize for debug
        if ((this.collider as any).showCollider !== undefined) { (this.collider as any).showCollider = true; }

        // Make sure object has the expected name by default
        if (this.sceneObject.name !== "ColliderTargetProvider") {
            print(`[HandColliderProvider] Renaming '${this.sceneObject.name}' to 'ColliderTargetProvider' for compatibility.`);
            this.sceneObject.name = "ColliderTargetProvider";
        }

        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
    }

    onUpdate() {
        const hand = this.getTrackedHand();
        if (!hand) { return; }
        // Midpoint between index tip and thumb tip (or fallbacks)
        const a = hand.indexTip?.position ?? hand.indexKnuckle?.position;
        const b = hand.thumbTip?.position ?? hand.thumbKnuckle?.position;
        if (!a || !b) { return; }
        const mid = a.add(b).uniformScale(0.5);
        // Slightly nudge up along palm normal to avoid penetrating surfaces
        const up = hand.indexKnuckle?.position && hand.wrist?.position ? hand.indexKnuckle.position.sub(hand.wrist.position).normalize() : vec3.up();
        const pos = mid.add(up.uniformScale(0.5));
        this.t.setWorldPosition(pos);
    }
}
