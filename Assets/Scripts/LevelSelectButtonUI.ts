import { PinchButton } from "SpectaclesInteractionKit.lspkg/Components/UI/PinchButton/PinchButton"
import { RacetrackGameManager } from "./RacetrackGameManager"
import { RacetrackType } from "./RacetrackType"

/**
 * This class is responsible for creating and positioning grid content items based on a specified prefab and item count. It instantiates the items and arranges them vertically with a specified offset.
 */
@component
export class LevelSelectButtonUI extends BaseScriptComponent {
  /**
   * Number of grid items to instantiate and display.
   */
  @input
  private image: Image

  @input
  private materialBase: Material;

  @input
  private button: PinchButton

  @input
  private textTitle: Text

  @input
  private textByText: Text
  manager: RacetrackGameManager

  private racetrackConfig: RacetrackType

  onAwake() {
    this.createEvent("OnStartEvent").bind(this.onStart.bind(this));
    this.materialBase = this.image.mainMaterial.clone();
    this.image.mainMaterial = this.materialBase;
  }

  private onStart() {
    this.button.onButtonPinched.add(() => {
        this.manager.loadRaceTrack(this.racetrackConfig);
    })
  }

  setRacetrack(racetrack: RacetrackType) {
    this.racetrackConfig = racetrack;
    this.image.mainMaterial.mainPass.baseTex = racetrack.img
    this.textTitle.text = racetrack.name;
    this.textByText.text = `Created by ${racetrack.creator}`;
  }
}
