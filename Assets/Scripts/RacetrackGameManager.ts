import { GridContentCreator } from "SpectaclesInteractionKit.lspkg/Components/UI/ScrollView/GridContentCreator";
import { RacetrackAPIHandler } from "./RacetrackAPIHandler";
import { RacetrackType } from "./RacetrackType";
import { LevelSelectButtonUI } from "./LevelSelectButtonUI";
import { RacetrackMeshGenerator } from "./RacetrackMeshGenerator";
import { PinchButton } from "SpectaclesInteractionKit.lspkg/Components/UI/PinchButton/PinchButton";
import { SceneController } from "./SceneController";

@component
export class RacetrackGameManager extends BaseScriptComponent {
    // Racetrack game manager. Should do the following things
    // Instantiate and place down 

    @input
    rtapi: RacetrackAPIHandler

    @input
    selectionButtonGrid: GridContentCreator

    @input
    mainHUD: SceneObject

    @input
    levelSelectButtonPrefab: ObjectPrefab

    @input
    private track: RacetrackMeshGenerator

    @input
    private openCloseButton: PinchButton

    @input
    private sceneController: SceneController

    @input
    private goose: SceneObject

    @input
    private startbox: ColliderComponent

    @input
    private stopwatch: Text

    @input
    private lastTime: Text

    private timer: number

    private currentMap: RacetrackType

    onAwake() {
        this.createEvent("OnStartEvent").bind(this.onStart.bind(this))
        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
    }

    onStart() {
        if (this.openCloseButton) {
            this.openCloseButton.onButtonPinched(() => {
                this.mainHUD.enabled = !this.mainHUD.enabled
            });
        }
        this.reloadRacetracks();
        this.startbox.onCollisionEnter.add(() => {
            this.rtapi.submitRacetrackTime(this.currentMap.id, "ERN", this.timer)
            this.lastTime.text = this.stopwatch.text
            this.timer = 0;
        })
    }

    reloadRacetracks() {
        print(this.selectionButtonGrid)
        this.selectionButtonGrid.killAllChildren();
        this.rtapi.getRacetracks().then((arr) => {
            print("Trying to get the stuff")
            print(arr)
            arr.forEach((rt) => {
                let instantiated = this.levelSelectButtonPrefab.instantiate(this.selectionButtonGrid.sceneObject)
                let component: LevelSelectButtonUI = instantiated.getComponent(LevelSelectButtonUI.getTypeName())
                if (component) {
                    component.setRacetrack(rt);
                    component.manager = this;
                }
                instantiated.enabled = true
                
            });
            print("Stuff has been got")
            this.selectionButtonGrid.recalculateOffsets()
        }).catch((e) => {
            print("An unknown error has occurred: " + e)
        })
    }

    loadRaceTrack(racetrack: RacetrackType) {
        this.track.texture = racetrack.img;
        this.currentMap = racetrack;
        this.track.generateTerrainMesh();
        let offset = this.track.getWorldXZFromTextureCoords(racetrack.startpos.x, racetrack.startpos.y)
        this.mainHUD.enabled = false;
        this.sceneController.resetPlacement();
        let newpos = new vec3(offset.x, this.goose.getTransform().getWorldPosition().y, offset.y);
        this.timer = 0;
        this.startbox.getTransform().setLocalPosition(newpos)
        //this.goose.getTransform().setLocalPosition(newpos)
    }

    onUpdate() {
        if (!this.currentMap) return
        this.stopwatch.text = this.timer.toFixed(2)
        this.timer += getDeltaTime();
    }
}
