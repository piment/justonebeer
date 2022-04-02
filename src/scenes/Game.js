import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }
  cursors;
  player;

  preload(){
    this.load.image('background', '../src/assets/PNG/Background/bg_layer1.png');
    this.load.image('perso', '../src/assets/PNG/Players/bunny1_ready.png')
    this.load.image('platform', '../src/assets/PNG/Environment/ground_cake.png')
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  create(){
    this.add.image(240,320, 'background');
    const platforms = this.physics.add.staticGroup();
    for(let i = 0; i < 5; i++){
      const x = Phaser.Math.Between(80,400);
      const y = 150 * i;

      const platform = platforms.create(x,y,'platform');
      platform.setScale(0.5);

      const body = platform.body;
      body.updateFromGameObject();
    }
    this.player = this.physics.add.sprite(240,320, 'perso').setScale(0.5);

    this.physics.add.collider(platforms, this.player);
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    this.cameras.main.startFollow(this.player);
  }

  update(){
    const touchingDown = this.player.body.touching.down;
    console.log(touchingDown);

    if(touchingDown){
      this.player.setVelocityY(-300);
    }

    if(this.cursors.left.isDown){
      this.player.setVelocityX(-200);
    }
    else if(this.cursors.right.isDown){
      this.player.setVelocityX(200);
    }
    else {
      this.player.setVelocityX(0);
    }
  }
}