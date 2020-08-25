export class GameOverWindow extends Phaser.Scene {
  constructor() {
    super({ key: 'gameover' });
  }
  preload() {
    
    //platform window
    this.load.image('gameover', 'images/gameover.png');
    
  }

  create() {
    this.add.image(410, 250, 'backgroundgameover');
    this.gameoverImage = this.add.image(400, 90, 'gameover');


    this.score = this.registry.get('score');
    this.scoreText = this.add.text(70, 160, `Has conseguido ${this.score} puntos`, { fontSize: '42px', fill: '#fff' });

    this.level = this.registry.get('level');
    this.levelText = this.add.text(70, 240, `Has llegado al nivel ${this.level}`, { fontSize: '42px', fill: '#fff' });


    this.startButton = this.add.sprite(400, 430, 'button').setInteractive();

    this.startButton.on('pointerover', () => {
      this.startButton.setFrame(1);
    });
    this.startButton.on('pointerout', () => {
      this.startButton.setFrame(0);
    });
    this.startButton.on('pointerdown', () => {
      this.startButton.setFrame(2);
      this.scene.start('platform')
      this.events.emit('game-restart');
    });
  }

}
