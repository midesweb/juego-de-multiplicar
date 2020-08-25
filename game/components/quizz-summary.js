
export class QuizzSummary {
  constructor(relatedScene) {
    this.relatedScene = relatedScene;
    this.questions = [];
    this.hitsOnQuestions = [];
    this.background = relatedScene.add.image(410, 250, 'backgroundStars');
    this.background.visible = false;
    this.textSingle = relatedScene.add.text(100, 120, '', {
      fontFamily: 'helvetica, verdana, arial', fontSize: '46px', fill: '#fff', 'textAlign': 'center'
    });
    this.textSingle.visible = false;
    this.textSummary = [];
    for(let i = 0; i < 3; i++) {
      this.textSummary.push(relatedScene.add.text(100, 80 + (i * 80), '', {
        fontFamily: 'helvetica, verdana, arial', fontSize: '40px', fill: '#fff', 'textAlign': 'center'
      }));
      this.textSummary[i].visible = false;
    }
  }

  showSingle(index, question, correct) {
    this.questions[index-1] = question;
    this.hitsOnQuestions[index-1] = correct;
    if(correct) {
      this.textSingle.setColor('#cfc');
      this.textSingle.setText(this.getSingleMessage(question, correct));
    } else {
      this.textSingle.setColor('#f99');
      this.textSingle.setText(this.getSingleMessage(question, correct));
    }
    this.background.visible = true;
    this.textSingle.visible = true;
  }

  showSummary() {
    this.background.visible = true;
    this.textSingle.visible = false;
    console.log(this.questions, this.hitsOnQuestions);
    for (let i in this.textSummary) {
      if(this.hitsOnQuestions[i]) {
        this.textSummary[i].setColor('#cfc');
        this.textSummary[i].setText(`${this.questions[i].operationString} = ${this.questions[i].result} ---- Acertaste :)`)
      } else {
        this.textSummary[i].setColor('#f99');
        this.textSummary[i].setText(`${this.questions[i].operationString} = ${this.questions[i].result} ---- Fallaste :(`)
      }
      this.textSummary[i].visible = true;
    }
  }

  hide() {
    this.background.visible = false;
    this.textSingle.visible = false;
    for (let i in this.textSummary) {
      this.textSummary[i].visible = false;
    }
  }

  getSingleMessage(question, correct) {
    if(correct) {
      return `Acertaste!! 
Lo has hecho bien:
${question.operationString} = ${question.result}`
    } else {
      return `Fallaste!!
Para la próxima recuerda:
${question.operationString} = ${question.result}`
    }
  }


}