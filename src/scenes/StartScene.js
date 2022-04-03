import Phaser from "phaser";


export default class StartScene extends Phaser.Scene {
  constructor(){
    super("StartScene");
  }

  preload(){}

  create() {
    document.querySelector('.button-play').addEventListener('click', () => {
      this.scene.start('GameScene');
    });
  }

  update() {

  }
}