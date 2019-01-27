import {
  createLives,
  createScoreText,
  setEventListeners,
  getRandomFruit,
  setVelocity,
  getRandomStartPoint
} from "./utils";

const innerWidth = window.innerWidth;
const livesCount = 3;
const gameObjSize = [200, 200];
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
const configureGameObj = ({ gameObj, startPointX }) => {
  game.physics.enable(gameObj, Phaser.Physics.ARCADE);
  gameObj.body.gravity.y = gravity;
  gameObj.inputEnabled = true;
  !gameObj.data.bomb && (gameObj.checkWorldBounds = true);
  [gameObj.width, gameObj.height] = gameObjSize;
  setEventListeners(gameObj);
  setVelocity(startPointX, gameObj);
};

const createFruitGenerator = () => {
  const createFruit = () => {
    const x = getRandomStartPoint();
    const y = game.height;
    const { name, points } = getRandomFruit();
    const fruit = game.add.sprite(x, y, name);
    fruit.data.points = points;
    configureGameObj({ gameObj: fruit, startPointX: x });
  };
  fruitIntervalId = setInterval(createFruit, fruitInterval);
};
const createBombGenerator = () => {
  const createBomb = () => {
    const x = getRandomStartPoint();
    const y = game.height;
    const bomb = game.add.sprite(x, y, "bomb");
    bomb.data.bomb = true;
    configureGameObj({ gameObj: bomb, startPointX: x });
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
  createScoreText();
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
  livesCount
};
