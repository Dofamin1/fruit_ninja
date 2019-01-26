import data from "./data";
import { game } from "./index";
let score = 0;
let scoreText;

const createLives = () => {
  const lives = game.add.group();
  const livesCount = 3;
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
const getRandomStartPoint = () => game.math.between(0, innerWidth);
export {
  createLives,
  createScore,
  setEventListeners,
  getRandomFruit,
  getRandomStartPoint,
  setVelocity
};
