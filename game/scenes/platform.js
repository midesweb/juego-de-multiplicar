import { Door } from '../components/door.js';
import { Stars } from '../components/stars.js';

export class PlatformWindow extends Phaser.Scene {
  constructor() {
    super({ key: 'platform' });
    this.score = 0;
    this.level = 1;
  }

  preload() {
    this.registerListeners(); 
    this.registry.set('level', 1);
  }

  create() {

    this.add.image(410, 250, 'backgroundPlatform');
    this.scoreText = this.add.text(16, 16, 'Puntos: 0', { fontSize: '32px', fill: '#000' });
    this.createSpikes();
    this.createPlatforms();
    this.createPlayer();
    //this.createStars();
    this.stars = new Stars(this);
    this.createBombs();
    this.door = new Door(this);
    // colisión de los pinchos con el personaje
    this.physics.add.collider(this.player, this.spikes, this.hitBomb, null, this);

    this.jumpAudio = this.sound.add('jumpaudio');
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(548, 440, 'ground').setScale(0.8).refreshBody();
    this.platforms.create(75, 320, 'ground2').setScale(0.7).refreshBody();;
    this.platforms.create(120, 490, 'ground').setScale(3.3).refreshBody();
    this.platforms.create(420, 568, 'ground2').setScale(4).refreshBody();

    this.platforms.create(648, 410, 'ground3');
    this.platforms.create(450, 210, 'ground3').setScale(1.8).refreshBody();
    this.platforms.create(619, 250, 'ground2').setScale(0.8).refreshBody();
    this.platforms.create(755, 335, 'ground');
  }

  createPlayer() {
    // JUGADOR 
    this.player = this.physics.add.sprite(300, 50, 'dude');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

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

    this.player.body.setGravityY(300)

    // Añadir las colisiones
    this.physics.add.collider(this.player, this.platforms);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createStars() {
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.4));
    });

    // colisión de las estrellas con el suelo
    this.physics.add.collider(this.stars, this.platforms);

    // colisión de las estrellas con el personaje
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
  }

  createBombs() {
    // bombas
    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.bombs, this.platforms);

    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
  }

  createSpikes() {
    this.spikes = this.physics.add.staticGroup();
    this.spikes.create(257, 488, 'spike').setScale(0.5).refreshBody();
    this.spikes.create(584, 488, 'spike').setScale(0.5).refreshBody();
    this.spikes.create(630, 488, 'spike').setScale(0.5).refreshBody();
    this.spikes.create(676, 488, 'spike').setScale(0.5).refreshBody();
    this.spikes.create(722, 488, 'spike').setScale(0.5).refreshBody();
    this.spikes.create(768, 488, 'spike').setScale(0.5).refreshBody();
    this.spikes.create(814, 488, 'spike').setScale(0.5).refreshBody();
    
  }

  update() {
    if (this.cursors.left.isDown) {

      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    }
    else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
      this.jumpAudio.play();
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {

        child.enableBody(true, child.x, 0, true, true);

      });

      
    }
  }

  hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.gameOver = true;
    this.scene.start('gameover');
    this.registry.set('score', this.score);
  }

  renew(hits) {
    let newBombs = 3 - hits;
    for(let i = 0; i < newBombs; i++) {
      this.createBomb();
    }
    this.score += hits * 100;
    this.refreshScore();
    this.stars.createStars(hits);
  }

  playerStop() {
    this.input.keyboard.clearCaptures();
    this.cursors.right.isDown = false;
    this.cursors.left.isDown = false;
    this.cursors.up.isDown = false;
  }

  refreshScore() {
    this.scoreText.setText('Puntos: ' + this.score);
  }

  createBomb() {
    var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var bomb = this.bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }

  registerListeners() {
    if(! this.hasRegisteredListeners) {
      this.scene.get('quizz').events.on('quizz-end', () => {
        let hits = this.registry.get('hits');
        this.renew(hits);
      });
      this.scene.get('gameover').events.on('game-restart', () => {
        this.score = 0;
        this.level = 1;
      });
      this.hasRegisteredListeners = true;
    }
  }
}
