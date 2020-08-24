import { createConfig } from './game/config.js';
import { LoaderWindow } from './game/scenes/loader.js';
import { PlatformWindow } from './game/scenes/platform.js';

const config = createConfig([LoaderWindow, PlatformWindow]);

var game = new Phaser.Game(config);
var cursors;
var player;
var stars;
var bombs;
var gameOver;
var score = 0;
var scoreText;

function preload() {
  this.load.image('background', 'images/backgrounds/bg_1.png');
  this.load.image('ground', 'images/present.png');
  this.load.image('star', 'images/star.png');
  this.load.image('bomb', 'images/bomb.png');
  this.load.spritesheet('dude',
    'images/dude.png',
    { frameWidth: 32, frameHeight: 48 }
  );
}

var platforms;

function create() {
  
  this.add.image(410, 250, 'background');

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(4).refreshBody();
  platforms.create(100, 490, 'ground').setScale(4).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 300, 'ground');
  platforms.create(750, 320, 'ground');

  // JUGADOR 
  player = this.physics.add.sprite(300, 50, 'dude');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  player.body.setGravityY(300)

  // Añadir las colisiones
  this.physics.add.collider(player, platforms);

  cursors = this.input.keyboard.createCursorKeys();

  // estrellas

  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.4));
  });
  
  // colisión de las estrellas con el suelo
  this.physics.add.collider(stars, platforms);
  
  // colisión de las estrellas con el personaje
  this.physics.add.overlap(player, stars, collectStar, null, this);

  // puntuación
  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  // bombas
  bombs = this.physics.add.group();

  this.physics.add.collider(bombs, platforms);

  this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play('right', true);
  }
  else {
    player.setVelocityX(0);

    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }

  

}

// función para tratamiento de la colisión de estrellas y personaje
function collectStar(player, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText('Score: ' + score);

  if (stars.countActive(true) === 0) {
    stars.children.iterate(function (child) {

      child.enableBody(true, child.x, 0, true, true);

    });

    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

  }
}

function hitBomb(player, bomb) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}