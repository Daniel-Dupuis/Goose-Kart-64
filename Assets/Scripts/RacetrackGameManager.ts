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

    private gooseOrigin: vec3

    onAwake() {
        this.createEvent("OnStartEvent").bind(this.onStart.bind(this))
    }

    onStart() {
        if (this.openCloseButton) {
            this.openCloseButton.onButtonPinched(() => {
                this.mainHUD.enabled = !this.mainHUD.enabled
            });
        }
        this.reloadRacetracks();
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
        this.track.generateTerrainMesh();
        this.mainHUD.enabled = false;
        this.sceneController.resetPlacement();
    }
}
