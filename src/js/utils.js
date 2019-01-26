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
let stateText;
let lives;

const createLives = () => {
  lives = game.add.group();
  for (var i = 0; i < livesCount; i++) {
    const ship = lives.create(game.world.width + 90 * i, 60, "heart");
    ship.anchor.setTo(2.5, 0.5);
  }
};
const createScore = () => {
  scoreText = game.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#fff"
  });
};
const createStateText = () => {
  stateText = game.add.text(
    350,
    200,
    `GAME OVER \n\t\t\t score:${score} \n\t  Click  here `,
    {
      font: "84px Arial",
      fill: "#fff"
    }
  );
  stateText.inputEnabled = true;
};
const addToScore = ({ points }) => {
  score = score + points * 10;
  scoreText.setText("Score: " + score);
};
const restartGame = () => {
  stateText.visible = false;
  createFruitGenerator();
  createBombGenerator();
  lives.callAll("revive");
  score = 0;
  scoreText.setText("Score: 0");
};
const gameOver = () => {
  clearInterval(bombIntervalId);
  clearInterval(fruitIntervalId);
  game.world.children.forEach(obj => {
    obj.type === 0 && obj.kill();
  });
  createStateText();
  stateText.visible = true;
  stateText.events.onInputDown.add(restartGame);
};
const subtractLive = () => {
  const live = lives.getFirstAlive();
  live && live.kill();
  lives.countLiving() < 1 && gameOver();
};
const setEventListeners = gameObj => {
  const isBomb = gameObj.data.bomb;
  gameObj.events.onInputDown.add(() => {
    isBomb ? gameOver() : addToScore(gameObj.data);
    gameObj.destroy();
  });
  gameObj.events.onOutOfBounds.add(() => {
    !isBomb && subtractLive();
  });
};
const setVelocity = (startPointX, fruit) => {
  const velocityY = game.math.between(-500, -740);
  const velocityX =
    startPointX > game.width / 2
      ? game.math.between(-90, -170)
      : game.math.between(90, 170);
  fruit.body.velocity.setTo(velocityX, velocityY);
};
const getRandomFruit = () => data[game.math.between(0, 3)];
const getRandomStartPoint = () => game.math.between(0, game.width - 100);

export {
  createLives,
  createScore,
  setEventListeners,
  getRandomFruit,
  getRandomStartPoint,
  setVelocity
};
