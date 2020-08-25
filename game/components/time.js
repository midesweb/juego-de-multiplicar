import { TweenHelper } from '../libs/tween-helper.js';

const textStyle = {
  fontFamily: 'helvetica, verdana, arial', fontSize: '36px', fill: '#fff'
}
const textBlinkStyle = {
  ...textStyle,
  fill: "#d33"
}

const timeForQuestions = 60;

export class Time {
  constructor(relatedScene) {
    this.stoped = true;
    this.time = timeForQuestions;
    this.relatedScene = relatedScene;
    this.text = relatedScene.add.text(14, 450, this.getString(), textStyle);
    this.textBlink = this.relatedScene.add.text(14, 450, this.getString(), textBlinkStyle);
    this.textBlink.visible = false;
    TweenHelper.flashElement(this.relatedScene, this.textBlink);
    this.start();
  }

  getString() {
    return `Tiempo: ${this.time}`;
  }

  countDown() {
    if(!this.stoped) {
      this.timeout = setTimeout( () => {
        this.time--;
        this.refreshDisplay();
        if(this.time ==0) {
          this.relatedScene.timeFinished();
        } else {
          this.countDown();
        }
      }, 1000);
    }
  }

  refreshDisplay() {
    this.text.setText(this.getString());
    this.textBlink.setText(this.getString());
  }

  showFinish() {
    this.text.setText('EL TIEMPO HA ACABADO!!!');
    this.text.setColor('#f96');
  }

  stop() {
    this.textBlink.visible = true;
    this.stoped = true;
    if(this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  start() {
    this.textBlink.visible = false;
    if(this.stoped) {
      this.stoped = false;
      this.countDown();
    }
  }

  reset() {
    this.time = timeForQuestions;
    if(this.stoped) {
      this.stoped = false;
      this.countDown();
    }
  }
}