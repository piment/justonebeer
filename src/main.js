import Phaser from 'phaser'
import StartScene from './scenes/StartScene'
import GameScene from './scenes/GameScene'

const config = {
	type: Phaser.AUTO,
	width: 600,
	height: 800,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
        debug: true
		}
	},
	scene: [StartScene, GameScene],
  parent: "game-canvas",
  transparent: true,
  audio: {
    disableWebAudio: true
  }
}

export default new Phaser.Game(config)
