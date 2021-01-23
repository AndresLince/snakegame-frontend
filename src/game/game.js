import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import { screenSizes} from "./config";

function launch(containerId) {  
  
  var config={
    type: Phaser.WEBGL,
    width: screenSizes().width,//640
    height: screenSizes().height,//480
    parent: containerId,
    backgroundColor: '#404f21',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: [ PlayScene]
  }
  return new Phaser.Game(config)
}

export default launch
export { launch }
