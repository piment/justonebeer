import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'

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
	scene: [HelloWorldScene]
}

export default new Phaser.Game(config)
