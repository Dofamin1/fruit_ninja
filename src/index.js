//TODO: package.json
require("phaser");
const data = [
  { name: "pineapple", points: 3 },
  { name: "watermelon", points: 5 },
  { name: "banana", points: 1 },
  { name: "apple", points: 2 }
];
const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;
const centerY = window.innerHeight / 2; //TODO: подумати над цим
const centerX = window.innerWidth / 2;
const fruitSize = [200, 200];

const config = {
  type: Phaser.AUTO,
  width: innerWidth,
  height: innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function startFruitGenerator() {
  const getRandomFruit = () => data[Phaser.Math.Between(0, 3)];
  const getRandomX = () => Phaser.Math.Between(0, innerWidth);
  const setVelocity = (startPointX, fruit) => {
    const velocityY = Phaser.Math.Between(-700, -1200);
    const velocityX =
      startPointX > innerWidth / 2
        ? Phaser.Math.Between(-90, -170)
        : Phaser.Math.Between(90, 170);
    fruit.setVelocityY(velocityY);
    fruit.setVelocityX(velocityX);
  };
  const setEventListeners = fruit => {};
  const createFruit = () => {
    //TODO: мабуть спрайти потрібно видаляти і івент лістенери!
    const x = getRandomX();
    const y = innerHeight;
    const { name, points } = getRandomFruit();
    const fruit = this.physics.add.sprite(x, y, name);
    fruit
      .setSize(...fruitSize)
      .setDisplaySize(...fruitSize)
      .setData({ points });
    setVelocity(x, fruit);
    // setEventListeners(fruit);
  };
  setInterval(createFruit, 800);
}

function preload() {
  this.load.image("background", "./images/background.png");
  this.load.image("pineapple", "./images/pineapple.png");
  this.load.image("watermelon", "./images/watermelon.png");
  this.load.image("banana", "./images/banana.png");
  this.load.image("apple", "./images/apple.png");
}

function create() {
  this.add.tileSprite(centerX, centerY, game.width, game.height, "background");
  startFruitGenerator.call(this);
}

function update() {}
