import Phaser from "phaser";
import bar from "../assets/justOneBeerBG2.jpg";

export default class StartScene extends Phaser.Scene {
  constructor(){
    super("StartScene");
  }

  preload(){
    this.load.image("bg", bar);

  }

  create() {
    this.width = this.sys.canvas.width;
    this.height = this.sys.canvas.height;

    this.add.image(0, 0, 'bg').setOrigin(0,0);
    document.querySelector('.button-play').addEventListener('click', (ev) => {
      ev.target.textContent = 'Restart';
      this.scene.start('GameScene');
    });
  }

  update() {

  }
}