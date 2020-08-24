const timeForQuestions = 60;

export class Time {
  constructor(relatedScene) {
    this.time = timeForQuestions;
    this.stoped = false;
    this.relatedScene = relatedScene;
    this.text = relatedScene.add.text(14, 450, this.getString(), {
      fontFamily: 'helvetica, verdana, arial', fontSize: '36px', fill: '#fff'
    });
    this.countDown();
  }

  getString() {
    return `Tiempo: ${this.time}`;
  }

  countDown() {
    setTimeout( () => {
      if(!this.stoped) {
        this.time--;
        this.refresh();
        if(this.time ==0) {
          this.relatedScene.timeFinished();
        } else {
          this.countDown();
        }
      }
    }, 1000)
  }

  refresh() {
    this.text.setText(this.getString());
  }

  showFinish() {
    this.text.setText('EL TIEMPO HA ACABADO!!!');
    this.text.setColor('#f96');
  }

  stop() {
    this.stoped = true;
  }

  restart() {
    this.time = timeForQuestions;
    if(this.stoped) {
      this.stoped = false;
      this.countDown();
    }
  }
}