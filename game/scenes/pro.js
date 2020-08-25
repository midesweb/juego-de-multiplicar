export class ProWindow extends Phaser.Scene {
  constructor() {
    super({ key: 'pro' });
  }
  preload() {
    //platform window
    this.load.image('pro', 'images/pro.png');
    
  }

  create() {
    this.add.image(410, 250, 'backgroundgameover');
    this.proImage = this.add.image(400, 90, 'pro');

    this.scoreText = this.add.text(35, 160, `Enhorabuena!! Demostraste ser el auténtico PRO de las mates!`, { fontSize: '26px', fill: '#fff', fontFamily: 'helvetica, verdana, arial' });

    this.score = this.registry.get('score');
    this.scoreText = this.add.text(70, 220, `Has conseguido ${this.score} puntos`, { fontSize: '42px', fill: '#fff' });

    this.level = this.registry.get('level');
    this.levelText = this.add.text(70, 290, `Has llegado al nivel ${this.level}`, { fontSize: '42px', fill: '#fff' });


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
