//TODO: package.json
require("phaser");
const innerWidth = window.innerWidth;
const innerHeight =  window.innerHeight;
const centerY = window.innerHeight / 2; //TODO: подумати над цим
const centerX =  window.innerWidth / 2;

const config = {
    type: Phaser.AUTO,
    width: innerWidth,
    height: innerHeight,
    physics: {
        default: 'arcade',
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

function createFruits(){
    const getRandomFruit = () => ["pineapple", "watermelon", "banana"][Phaser.Math.Between(0, 2)]
    const getRandomX = () => Phaser.Math.Between(0, innerWidth)
    const fruit = this.physics.add.sprite(getRandomX(), innerHeight, getRandomFruit())
    fruit.setSize(200, 200)
    fruit.setDisplaySize (200, 200)
    fruit.setVelocityY(-930);
    fruit.setVelocityX(130);

}

function preload ()
{
    this.load.image('background', './images/background.png');
    this.load.image('pineapple', './images/pineapple.png');
    this.load.image('watermelon', './images/watermelon.png');
    this.load.image('banana', './images/banana.png'); //TODO: banana
}

function create ()
{
    this.add.tileSprite(centerX, centerY, game.width, game.height, 'background');
    createFruits.call(this)
}

function update ()
{
}
