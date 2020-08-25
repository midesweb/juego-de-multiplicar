export class LoaderWindow extends Phaser.Scene {
  constructor() {
    super({ key: 'LoaderWindow' });
  }
  preload() {
    // this window
    this.load.image('backgroundIntro', '../../images/backgrounds/intro.png');
    this.load.spritesheet('button', '../../images/buttons/comenzar.png', { frameWidth: 190, frameHeight: 49 });

    //platform window
    this.load.image('backgroundPlatform', 'images/backgrounds/bg_1.png');
    this.load.image('door', 'images/door.png');
    this.load.image('ground', 'images/present.png');
    this.load.image('ground2', 'images/present2.png');
    this.load.image('ground3', 'images/present3.png');
    this.load.image('star', 'images/star.png');
    this.load.image('bomb', 'images/bomb.png');
    this.load.image('spike', 'images/spikes_top.png');
    this.load.spritesheet('dude',
      'images/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    this.load.audio('jumpaudio', 'sound/jump1.ogg');
    this.load.audio('selectaudio', 'sound/select.ogg');

    // game over y pro
    this.load.image('backgroundgameover', '../../images/backgrounds/bg-stars2.png');
  }
  
  create() {
    this.add.image(410, 250, 'backgroundIntro');
    this.startButton = this.add.sprite(400, 230, 'button').setInteractive();

    this.startButton.on('pointerover', () => {
      this.startButton.setFrame(1);
    });
    this.startButton.on('pointerout', () => {
      this.startButton.setFrame(0);
    });
    this.startButton.on('pointerdown', () => {
      this.startButton.setFrame(2);
      this.scene.start('platform')
    });
  }
  
}
