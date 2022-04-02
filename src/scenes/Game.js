import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  cursors;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  players = [];

  preload(){
    this.load.image('background', '../src/assets/PNG/Background/bg_layer1.png');
    this.load.image('beer', '../src/assets/PNG/Fantasy Medieval Beer Icons/PNG/05.png')
    this.load.image('platform', '../src/assets/PNG/Environment/ground_cake.png')
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  create(){
    this.add.image(240,320, 'background');
    // const platforms = this.physics.add.staticGroup();
    // for(let i = 0; i < 5; i++){
    //   const x = Phaser.Math.Between(80,400);
    //   const y = 150 * i;

    //   const platform = platforms.create(x,y,'platform');
    //   platform.setScale(0.5);

    //   const body = platform.body;
    //   body.updateFromGameObject();
    // }
    for(let i = 0; i < 10; i++) {
      this.players.push(this.createNewBeer(i));
    }
    console.log(this.players)
    // this.physics.add.collider(platforms, this.player);
    // this.player.body.checkCollision.up = false;
    // this.player.body.checkCollision.left = false;
    // this.player.body.checkCollision.right = false;

    // this.cameras.main.startFollow(this.player);
  }

  update(){
    this.players.forEach(player => {
      if(player[1] > 0){
        console.log(player[1])
        player[1]--;
      }
      else {
       this.physics.add.sprite(this.players.splice(this.players.indexOf(player))[0][0], -105, 'beer').setScale(0.2)
      }
    }
      );
    
    // const touchingDown = this.player.body.touching.down;
    // console.log(touchingDown);

    // if(touchingDown){
    //   this.player.setVelocityY(-300);
    // }

    // if(this.cursors.left.isDown){
    //   this.player.setVelocityX(-200);
    // }
    // else if(this.cursors.right.isDown){
    //   this.player.setVelocityX(200);
    // }
    // else {
    //   this.player.setVelocityX(0);
    // }
  }

  createNewBeer(nb) {
    const column = [80,240,400,80,240,400,80,240,400,80,240,400][Math.floor(Math.random() * 12)];
    return [column, Math.floor(Math.random() * 120), nb];
  }
}