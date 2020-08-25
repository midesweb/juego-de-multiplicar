export class DisplayFeedback {
  constructor(relatedScene) {
    this.relatedScene = relatedScene;
    this.text = relatedScene.add.text(260, 400, '', {
      fontFamily: 'helvetica, verdana, arial', fontSize: '32px', fill: '#fff'
    });
  }

  showSuccess(text) {
    this.text.setText(text);
    this.text.setColor('#ff9');
    this.clear()
  }

  showError(text) {
    this.text.setText(text);
    this.text.setColor('#fff');
    this.clear()
  }

  clear() {
    if(this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout( () => {
      this.text.setText('');
    }, 10000);
  }

}