//TODO: package.json

import {
  createLives,
  createScore,
  setEventListeners,
  getRandomFruit,
  setVelocity,
  getRandomStartPoint
} from "./utils";

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;
const fruitSize = [200, 200];
const gravity = 300;
const timeInterval = 800;

var game = new Phaser.Game(
  innerWidth,
  innerHeight,
  Phaser.AUTO,
  "fruit-ninja",
  {
    preload: preload,
    create: create,
    update: update
  }
);

const createFruitGenerator = () => {
  const createFruit = () => {
    const x = getRandomStartPoint();
    const y = innerHeight;
    const { name, points } = getRandomFruit();
    const fruit = game.add.sprite(x, y, name);
    game.physics.enable(fruit, Phaser.Physics.ARCADE);
    fruit.body.gravity.y = gravity;
    fruit.inputEnabled = true;
    fruit.checkWorldBounds = true;
    [fruit.width, fruit.height] = fruitSize;
    fruit.data.points = points;
    setEventListeners(fruit);
    setVelocity(x, fruit);
  };
  setInterval(createFruit, timeInterval);
};

function preload() {
  game.load.image("background", "./images/background.png");
  game.load.image("pineapple", "./images/pineapple.png");
  game.load.image("watermelon", "./images/watermelon.png");
  game.load.image("banana", "./images/banana.png");
  game.load.image("apple", "./images/apple.png");
  game.load.image("heart", "./images/heart.png");
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.tileSprite(0, 0, game.width, game.height, "background");
  createScore();
  createLives();
  createFruitGenerator();
}

function update() {}
export { game };
