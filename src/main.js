import Phaser from 'phaser'
import StartScene from './scenes/StartScene'
import GameScene from './scenes/GameScene'

const gameWidth = window.innerWidth / 100 * 40;
const gameHeight = window.innerHeight / 100 * 80;


const config = {
	type: Phaser.AUTO,
	width: gameWidth > 600 ? 600 : gameWidth,
	height: gameHeight > 800 ? 800 : gameHeight,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
        debug: false
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
