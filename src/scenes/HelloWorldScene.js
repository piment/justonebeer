import Phaser from "phaser";
import beer_01 from "../assets/beers/01.png";
import beer_02 from "../assets/beers/02.png";
import beer_03 from "../assets/beers/03.png";

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
    this.beers = ["beer_01", "beer_02", "beer_03"];
  }

  preload() {
    this.load.image("beer_01", beer_01);
    this.load.image("beer_02", beer_02);
    this.load.image("beer_03", beer_03);
  }

  create() {
    Phaser.Physics.Arcade.World;
    this.height = this.sys.canvas.height;
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
      } else {
        this.beersGroup.add(
          this.createBeer(this.getColumn(id), 0, 0)
            .setActive(false)
            .setVisible(false)
        );
      }
    });

    this.cursor = this.input.keyboard.createCursorKeys();

    this.score = 10;
    this.scoreDisplayed = this.add.text(10, 10, `Score: ${this.score}`);
  }
  update() {
    if (this.beersGroup.children.entries.length === 0) {
      this.beersRow = this.getBeersRow();
      console.log(this.beersRow);
      console.log(this.beersGroup.children.entries);
      this.beersRow.forEach((beer, id) => {
        if (beer) {
          this.beersGroup.add(
            this.createBeer(this.getColumn(id), 0, 0).setActive(false)
          );
        } else {
          this.beersGroup.add(
            this.createBeer(this.getColumn(id), 0, 0)
              .setActive(false)
              .setVisible(false)
          );
        }
      });
    }
    this.beersGroup.children.entries.forEach((el) => {
      if (!el.active) {
        el.setActive(true);
        el.setVelocityY(500);
      } else if (el.y > this.height) {
        if(el.visible){
          this.score -= 1;
        }
        el.setActive(false);
        el.setVisible(false);
        el.destroy(true);
        
        
      }
    });
    if(this.beersGroup.children.entries[0].active == true){
      console.log("test ", this.beersGroup.children.entries[0]);  
    }
    
    if (this.cursor.left.isDown && this.cursor.left.getDuration() < 50) {
      console.log(this.cursor.left.getDuration());
      this.touchGroup.children.entries[0].setFillStyle("0xffffff");
      
      if (
        this.beersGroup.children.entries[0] &&
        this.beersGroup.children.entries[0].y > this.sys.canvas.height - 100
      ) {
        console.log("hit 1");
        
        console.log(this.beersGroup.children.entries[0]);
        
        this.beersGroup.children.entries[0].setVisible(false);
        this.beersGroup.children.entries[0].destroy(true);
        this.score += 1;
      }
    } else {
      this.touchGroup.children.entries[0].setFillStyle("0x333333");
    }
    if (this.cursor.up.isDown && this.cursor.up.getDuration() < 50) {
      this.touchGroup.children.entries[1].setFillStyle("0xffffff");
      if (
        this.beersGroup.children.entries[1] &&
        this.beersGroup.children.entries[1].y > this.sys.canvas.height - 100
      ) {
        this.beersGroup.children.entries[1].destroy(true);
        console.log("hit 2");
        this.score += 1;
      }
    } else {
      this.touchGroup.children.entries[1].setFillStyle("0x333333");
    }
    if (this.cursor.right.isDown && this.cursor.right.getDuration() < 50) {
      console.log(this.beersGroup.children.entries);
      this.touchGroup.children.entries[2].setFillStyle("0xffffff");
      if (
        this.beersGroup.children.entries[2] &&
        this.beersGroup.children.entries[2].y > this.sys.canvas.height - 100
      ) {
        this.beersGroup.children.entries[2].destroy(true);
        console.log("hit 3");
        this.score += 1;
      }
    } else {
      this.touchGroup.children.entries[2].setFillStyle("0x333333");
    }
    this.scoreDisplayed.setText(`Score: ${this.score}`);

    // this.beersGroup.children.entries.forEach((beer, id) => {
    //   if (beer.y > this.sys.canvas.height - 100) {
    //     console.log(beer.x);
    //     if (beer.x === 100 && this.cursor.left.isDown) {
    //       this.touchGroup.children.entries[id].setFillStyle("0xffffff");
    //       this.score += 10;
    //       console.log("Score = ", this.scoreDisplayed.text);
    //       this.scoreDisplayed.setText(`Score: ${this.score}`);
    //     }
    //     else if (beer.x === 300 && this.cursor.up.isDown) {
    //       this.touchGroup.children.entries[id].setFillStyle("0xffffff");
    //       this.score += 10;
    //       console.log("Score = ", this.scoreDisplayed.text);
    //       this.scoreDisplayed.setText(`Score: ${this.score}`);
    //     }
    //     else if (beer.x === 500 && this.cursor.right.isDown) {
    //       this.touchGroup.children.entries[id].setFillStyle("0xffffff");
    //       this.score += 10;
    //       console.log("Score = ", this.scoreDisplayed.text);
    //       this.scoreDisplayed.setText(`Score: ${this.score}`);
    //     }
    //     else {
    //       this.touchGroup.children.entries[id].setFillStyle("0x333333");
    //     }
    //   }
    // });
  }

  createBeer = (column, row, type) => {
    return this.physics.add.image(column, row, this.beers[type]).setScale(0.2);
  };

  createBeersGroup = (row) => {
    const beersGroup = this.physics.add.group();
    const beersRow = this.getBeersRow();
    beersRow.forEach((beer, id) => {
      if (beer) {
        beersGroup.add(
          this.createBeer(this.getColumn(id), row).setActive(false)
        );
      } else {
        beersGroup.add(
          this.createBeer(this.getColumn(id), row)
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
      return Math.floor(Math.random() * 2);
    };
    return [getBeerOrNot(), getBeerOrNot(), getBeerOrNot()];
  };

  getTime = () => {
    return (this.game.getTime() / 1000).toFixed(2);
  };
}
