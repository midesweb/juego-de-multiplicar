import { MultiplicationGenerator } from '../multiplication-generator.js';
import { Option } from '../components/option.js';
import { Time } from '../components/time.js';
import { DisplayHits } from '../components/display-hits.js';

export class QuizzWindow extends Phaser.Scene {
  constructor() {
    super({ key: 'quizz' });
    this.numberQuestions = 3;
    this.currentQuestion = 0;
    this.hits = 0;
    this.stoped = false;
  }

  preload() {
    this.load.image('backgroundQuizz', 'images/backgrounds/bg_quizz.png');
    this.load.spritesheet('dude_static',
      'images/dude/dude-static.png',
      { frameWidth: 108, frameHeight: 160 }
    );
    this.load.spritesheet('alien_static',
      'images/alien/alien_swim.png',
      { frameWidth: 70, frameHeight: 100 }
    );
    this.load.image('alien_ship', 'images/alien/ship.png');
    this.load.image('baloon', 'images/baloon.png');
    this.level = this.registry.get('level');
    if(this.level == 1) {
      this.multiplicationGenerator = new MultiplicationGenerator(10);
    } else {
      this.multiplicationGenerator = new MultiplicationGenerator(this.level);
    }
    this.load.image('laser0', 'images/alien/laserBlue3.png');
    this.load.image('laser1', 'images/alien/laserPink3.png');
    this.load.image('laser2', 'images/alien/laserYellow3.png');
  }

  create() {
    this.add.image(410, 250, 'backgroundQuizz');
    this.add.image(289, 113, 'baloon').setScale(0.6);;
    this.add.image(143, 343, 'alien_ship');
    this.dudeStatic = this.add.sprite(600, 290, 'dude_static').setScale(0.7);;
    this.alienStatic = this.add.sprite(150, 260, 'alien_static').setScale(1.5);
    this.operationDisplay = this.add.text(255, 66, '', {
      fontFamily: 'helvetica, verdana, arial', fontSize: '32px', fill: '#000' 
    });
    this.options = [];
    for(let i = 0; i < 3; i++) {
      this.options[i] = new Option(this, i, '');
    }
    this.time = new Time(this);
    this.displayHits = new DisplayHits(this, 0, 1);
    this.setupQuestion();

    this.scene.get('platform').events.on('quizz-start', () => {
      this.time.restart();
      this.level = this.registry.get('level');
      this.currentQuestion = 0;
      this.hits = 0;
      this.stoped = false;
      this.displayHits.refresh(this.hits, this.currentQuestion);
      this.setupQuestion();
      setTimeout(() => {
        this.moveStatic(this.dudeStatic);
        this.moveStatic(this.alienStatic);
      }, 1000)
    });

  }

  moveStatic(character) {
    if(!this.stoped) {
      // console.log('movestatic');
      let delay = Math.random() * 2000;
      setTimeout( () => {
        character.setFrame(1);
        setTimeout(() => {
          character.setFrame(0);
          let delay = Math.random() * 10000;
          setTimeout(() => {
            this.moveStatic(character);
          }, delay);
        }, 1000)
      }, delay);
    } 
  }

  optionChoose(index) {
    // console.log('han seleccionado ' , index);
    if (this.currentOperation.result == this.currentOperation.alternativeAnswers[index]) {
      this.hits++;
    }
    this.setupQuestion();

  }

  timeFinished() {
    // console.log('el tiempo ha acabado');
    this.time.showFinish();
    this.endScene();
  }

  setupQuestion() {
    this.currentQuestion++;
    if(this.currentQuestion <= this.numberQuestions) {
      this.displayHits.refresh(this.hits, this.currentQuestion);
      this.currentOperation = this.multiplicationGenerator.createQuestion();
      this.operationDisplay.setText(this.currentOperation.operationString);
      for (let i = 0; i < 3; i++) {
        this.options[i].setText(this.currentOperation.alternativeAnswers[i]);
      }
    } else {
      this.displayHits.refresh(this.hits, this.currentQuestion - 1);
      // console.log('has llegado al final de las preguntas');
      this.endScene();
    }
  }

  endScene() {
    console.log('endScene!!');
    this.registry.set('level', this.registry.get('level') + 1);
    this.registry.set('hits', this.hits);
    this.scene.switch('platform');
    
    this.time.stop();
    //this.scene.destroy();
    console.log('endScene2!!');
    this.stoped = true;
    // level scene
    this.events.emit('quizz-end' /*…*/);
  }
}
