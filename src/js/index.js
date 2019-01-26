import {
  createLives,
  createScore,
  setEventListeners,
  getRandomFruit,
  setVelocity,
  getRandomStartPoint
} from "./utils";

const innerWidth = window.innerWidth;
const livesCount = 3;
const fruitSize = [200, 200];
const gravity = 450;
const fruitInterval = 800;
const bombInterval = 3000;
let fruitIntervalId;
let bombIntervalId;

const game = new Phaser.Game(innerWidth, 600, Phaser.AUTO, "", {
  preload: preload,
  create: create,
  update: update
});

const createFruitGenerator = () => {
  const createFruit = () => {
    const x = getRandomStartPoint();
    const y = game.height;
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
  fruitIntervalId = setInterval(createFruit, fruitInterval);
};
const createBombGenerator = () => {
  const createBomb = () => {
    const x = getRandomStartPoint();
    const y = game.height;
    const bomb = game.add.sprite(x, y, "bomb");
    game.physics.enable(bomb, Phaser.Physics.ARCADE);
    bomb.body.gravity.y = gravity;
    bomb.inputEnabled = true;
    bomb.data.bomb = true;
    setEventListeners(bomb);
    setVelocity(x, bomb);
  };
  bombIntervalId = setInterval(createBomb, bombInterval);
};

function preload() {
  game.load.image("background", "./images/background.png");
  game.load.image("pineapple", "./images/pineapple.png");
  game.load.image("watermelon", "./images/watermelon.png");
  game.load.image("banana", "./images/banana.png");
  game.load.image("apple", "./images/apple.png");
  game.load.image("heart", "./images/heart.png");
  game.load.image("bomb", "./images/bomb.png");
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.tileSprite(0, 0, game.width, game.height, "background");
  createScore();
  createLives();
  createFruitGenerator();
  createBombGenerator();
}

function update() {}
export {
  game,
  bombIntervalId,
  fruitIntervalId,
  createFruitGenerator,
  createBombGenerator,
  livesCount,
  innerWidth
};
