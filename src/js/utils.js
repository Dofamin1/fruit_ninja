import data from "./data";
import {
  game,
  bombIntervalId,
  fruitIntervalId,
  createFruitGenerator,
  createBombGenerator,
  livesCount
} from "./index";
let score = 0;
let scoreText;
let failText;
let lives;

const createLives = () => {
  lives = game.add.group();
  for (let i = 0; i < livesCount; i++) {
    const ship = lives.create(game.world.width + 90 * i, 60, "heart");
    ship.anchor.setTo(2.5, 0.5);
  }
};
const createScoreText = () => {
  scoreText = game.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#fff"
  });
};
const createFailText = () => {
  failText = game.add.text(
    game.world.centerX,
    game.world.centerY,
    `GAME OVER \n\t\t\t score:${score} \n\t Click  here `,
    {
      font: "84px Arial",
      fill: "#fff"
    }
  );
  failText.anchor.setTo(0.5, 0.5);
  failText.inputEnabled = true;
  failText.visible = true;
  failText.events.onInputDown.add(restartGame);
};
const addToScore = ({ points }) => {
  score += points * 10;
  scoreText.setText("Score: " + score);
};
const restartGame = () => {
  failText.visible = false;
  createFruitGenerator();
  createBombGenerator();
  lives.callAll("revive");
  score = 0;
  scoreText.setText("Score: 0");
};
const finishGame = () => {
  clearInterval(bombIntervalId);
  clearInterval(fruitIntervalId);
  game.world.children.forEach(obj => {
    obj.type === 0 && obj.kill();
  });
  createFailText();
};
const subtractLive = () => {
  const live = lives.getFirstAlive();
  live && live.kill();
  lives.countLiving() < 1 && finishGame();
};
const setEventListeners = gameObj => {
  const isBomb = gameObj.data.bomb;
  gameObj.events.onInputDown.add(() => {
    isBomb ? finishGame() : addToScore(gameObj.data);
    gameObj.destroy();
  });
  gameObj.events.onOutOfBounds.add(subtractLive);
};
const setVelocity = (startPointX, fruit) => {
  const velocityY = game.math.between(-500, -740);
  const velocityX =
    startPointX > game.world.centerX
      ? game.math.between(-90, -170)
      : game.math.between(90, 170);
  fruit.body.velocity.setTo(velocityX, velocityY);
};
const getRandomFruit = () => data[game.math.between(0, 3)];
const getRandomStartPoint = () => game.math.between(0, game.width - 100);

export {
  createLives,
  createScoreText,
  setEventListeners,
  getRandomFruit,
  getRandomStartPoint,
  setVelocity
};
