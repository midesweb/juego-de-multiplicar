export class DisplayHits {
  constructor(relatedScene, hits, question) {
    this.relatedScene = relatedScene;
    this.hits = hits;
    this.question = question;
    this.text = relatedScene.add.text(650, 430, this.getString(), {
      fontFamily: 'helvetica, verdana, arial', fontSize: '26px', fill: '#fff'
    });
  }

  getString() {
    return `Pregunta: ${this.question}
Aciertos: ${this.hits}`;
  }

  refresh(hits, question) {
    this.hits = hits;
    this.question = question;
    this.text.setText(this.getString());
  }
}