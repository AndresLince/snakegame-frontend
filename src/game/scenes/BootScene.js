import { Scene } from 'phaser'
import sky from '@/assets/skies/sky3.png'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {    
 
  }

  create () {
    this.scene.start('PlayScene')
  }
}
