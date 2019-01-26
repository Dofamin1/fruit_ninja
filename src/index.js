//TODO: package.json
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
let score = 0;
let scoreText;

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

const createScore = () => {
  scoreText = game.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#fff"
  });
};
const createFruitGenerator = () => {
  const addToScore = ({ points }) => {
    score = score + points * 10;
    scoreText.setText("Score: " + score);
  };
  const setEventListeners = fruit => {
    fruit.events.onInputDown.add(() => {
      addToScore(fruit.data);
      fruit.destroy();
    });
    fruit.events.onOutOfBounds.add(() => {});
  };
  const setVelocity = (startPointX, fruit) => {
    const velocityY = game.math.between(-400, -800);
    const velocityX =
      startPointX > innerWidth / 2
        ? game.math.between(-90, -170)
        : game.math.between(90, 170);
    fruit.body.velocity.setTo(velocityX, velocityY);
  };
  const getRandomFruit = () => data[game.math.between(0, 3)];
  const getRandomX = () => game.math.between(0, innerWidth);
  const createFruit = () => {
    const x = getRandomX();
    const y = innerHeight;
    const { name, points } = getRandomFruit();
    const fruit = game.add.sprite(x, y, name);
    game.physics.enable(fruit, Phaser.Physics.ARCADE);
    fruit.body.gravity.y = 300;
    fruit.inputEnabled = true;
    fruit.checkWorldBounds = true;
    fruit.width = 200;
    fruit.height = 200;
    fruit.data.points = points;
    setEventListeners(fruit);
    setVelocity(x, fruit);
  };
  setInterval(createFruit, 800);
};
const createLives = () => {
  const lives = game.add.group();
  const livesCount = 3;
  for (var i = 0; i < livesCount; i++) {
    const ship = lives.create(game.world.width + 90 * i, 60, "heart");
    ship.anchor.setTo(2.5, 0.5);
  }
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
