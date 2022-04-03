import Phaser from "phaser";
import beer_01 from "../assets/beers/01_foam.png";
import beer_02 from "../assets/beers/02_foam.png";
import beer_03 from "../assets/beers/03_foam.png";
import beer_04 from "../assets/beers/04_foam.png";
import beer_05 from "../assets/beers/05.png";
import beer_06 from "../assets/beers/06_foam.png";
import beer_07 from "../assets/beers/07.png";
import beer_08 from "../assets/beers/08_foam.png";
import beer_09 from "../assets/beers/09_foam.png";
import beer_10 from "../assets/beers/10_foam.png";

import grab from '../assets/sounds/Audio/cardShove1.ogg';
import music from '../assets/sounds/music/Parabola.mp3';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.beers = [
      "beer_01",
      "beer_02",
      "beer_03",
      "beer_04",
      "beer_05",
      "beer_06",
      "beer_07",
      "beer_08",
      "beer_09",
      "beer_10",
    ];
  }

  preload() {
    this.load.image("beer_01", beer_01);
    this.load.image("beer_02", beer_02);
    this.load.image("beer_03", beer_03);
    this.load.image("beer_04", beer_04);
    this.load.image("beer_05", beer_05);
    this.load.image("beer_06", beer_06);
    this.load.image("beer_07", beer_07);
    this.load.image("beer_08", beer_08);
    this.load.image("beer_09", beer_09);
    this.load.image("beer_10", beer_10);
    this.load.audio('grab', grab);
    this.load.audio('music', music);
  }

  create() {

    this.grab = this.sound.add('grab');
    this.music = this.sound.add('music');
    this.music.play({'volume': 0.2});
    this.height = this.sys.canvas.height;
    this.width = this.sys.canvas.width;
    this.beersState = [];

    this.touchGroup = this.physics.add.staticGroup();
    this.touchGroup.add(
      this.add.ellipse(90, this.height - 50, 100, 50, 0x333333)
    );
    this.touchGroup.add(
      this.add.ellipse(290, this.height - 50, 100, 50, 0x333333)
    );
    this.touchGroup.add(
      this.add.ellipse(490, this.height - 50, 100, 50, 0x333333)
    );

    // this.beersArray = Array.from({length:5}, (el, id) => Array.from({length:3}, () => this.createBeersGroup(id)));
    // console.log(this.beersArray);
    this.beersGroup = this.physics.add.group();
    this.beersRow = this.getBeersRow();
    this.beersRow.forEach((beer, id) => {
      if (beer) {
        this.beersGroup.add(
          this.createBeer(this.getColumn(id), 0, 0).setActive(false)
        );
        this.beersState.push(0);
      } else {
        this.beersGroup.add(
          this.createBeer(this.getColumn(id), 0, 0)
            .setActive(false)
            .setVisible(false)
        );
        this.beersState.push(0);
      }
    });

    this.cursor = this.input.keyboard.createCursorKeys();

    this.score = 10;
    this.scoreDisplayed = this.add.text(10, 10, `Score: ${this.score}`);
    this.takenBeers = this.physics.add.group();

    
  }

  update() {
    const up = this.cursor.up;
    const left = this.cursor.left;
    const right = this.cursor.right;
    const beers = this.beersGroup.children.entries;
    const keys = this.touchGroup.children.entries;
    const takenBeers = this.takenBeers.children.entries;
    const beersState = this.beersState;

    if (beers.length < 3) {
      this.beersState = [];
      this.beersRow = this.getBeersRow();

      this.beersRow.forEach((beer, id) => {
        if (beer) {
          this.beersGroup.add(
            this.createBeer(this.getColumn(id), 0, 0).setActive(false)
          );
          this.beersState.push(0);
        } else {
          this.beersGroup.add(
            this.createBeer(this.getColumn(id), 0, 0)
              .setActive(false)
              .setVisible(false)
          );
          this.beersState.push(0);
        }
      });
    }
    this.beersGroup.children.entries.forEach((beer) => {
      if (!beer.active) {
        beer.setActive(true);
        beer.setVelocityY(500);
      } else if (beer.y > this.height) {
        if (beer.visible) {
          this.score -= 1;
        }
        beer.setActive(false);
        beer.setVisible(false);
        beer.destroy(true);
      }
    });

    this.takenBeers.children.entries.forEach((beer, id) => {
      if (beersState[id] == 1) {
        if (takenBeers[id].body.position.x > this.width) {
          this.beersState[id] = 0;
          this.takenBeers.children.entries.splice(id, 1)[0].destroy(true);
        }
      }
    });
    if (left.isDown && left.getDuration() < 100) {
      console.log(this.beersState);
      keys[0].setFillStyle("0xffffff");

      if (beers[0] && beers[0].body.position.y > this.height - 175) {
        if (beers[0].visible) {
          this.score += 1;
          this.grab.play({'volume': 0.5});
          if (this.beersState[0] === 0) {
            this.beersState[0] = 1;
            this.takenBeers.add(
              this.beersGroup.children.entries.splice(0, 1)[0]
            );
            const index = this.takenBeers.children.entries.length - 1;
            const beer = this.takenBeers.children.entries[index];
            beer.setVelocityY(0);
            beer.setVelocityX(800);
          }
        }

        // this.beersGroup.children.entries[0].setActive(false);
        // this.beersGroup.children.entries[0].destroy(true);
      }
    } else {
      keys[0].setFillStyle("0x333333");
    }
    if (up.isDown && up.getDuration() < 100) {
      keys[1].setFillStyle("0xffffff");
      if (beers[1] && beers[1].body.position.y > this.height - 175) {
        if (beers[1].visible) {
          this.score += 1;
          this.grab.play({'volume': 0.5});
          if (this.beersState[1] === 0) {
            this.beersState[1] = 1;
            this.takenBeers.add(beers.splice(1, 1)[0]);
            const index = this.takenBeers.children.entries.length - 1;
            const beer = this.takenBeers.children.entries[index];
            beer.setVelocityY(0);
            beer.setVelocityX(800);
          }
        }
      }
    } else {
      keys[1].setFillStyle("0x333333");
    }
    if (right.isDown && right.getDuration() < 100) {
      keys[2].setFillStyle("0xffffff");
      if (beers[2] && beers[2].body.position.y > this.height - 175) {
        if (beers[2].visible) {
          this.score += 1;
          this.grab.play({'volume': 0.5});
          if (this.beersState[2] === 0) {
            this.beersState[2] = 1;
            this.takenBeers.add(beers.splice(2, 1)[0]);
            const index = this.takenBeers.children.entries.length - 1;
            const beer = this.takenBeers.children.entries[index];
            beer.setVelocityY(0);
            beer.setVelocityX(800);
          }
        }
      }
    } else {
      keys[2].setFillStyle("0x333333");
    }
    this.scoreDisplayed.setText(`Score: ${this.score}`);
  }

  createBeer = (column, row, type) => {
    return this.physics.add
      .sprite(
        column,
        Phaser.Math.Between(100, -500),
        this.beers[
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 10)]
        ]
      )
      .setScale(0.2);
  };

  createBeersGroup = (row) => {
    const beersGroup = this.physics.add.group();
    const beersRow = this.getBeersRow();
    beersRow.forEach((beer, id) => {
      if (beer) {
        beersGroup.add(
          // this.createBeer(this.getColumn(id), row).setActive(false)
          this.createBeer(this.getColumn(id), -50).setActive(false)
        );
      } else {
        beersGroup.add(
          this.createBeer(this.getColumn(id), 0)
            .setActive(false)
            .setVisible(false)
        );
      }
    });
    return beersGroup;
  };

  getColumn = (i = -1) => {
    return i === -1
      ? [100, 300, 500][Math.floor(Math.random() * 3)]
      : [100, 300, 500][i];
  };

  getBeersRow = () => {
    const getBeerOrNot = () => {
      const array = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
      return Math.floor(Math.random() * 10);
    };
    return [getBeerOrNot(), getBeerOrNot(), getBeerOrNot()];
  };

  getTime = () => {
    return (this.game.getTime() / 1000).toFixed(2);
  };
}
