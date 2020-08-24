let positions = [
  {
    top: 50,
    left: 700,
  },
  {
    top: 120,
    left: 700,
  },
  {
    top: 190,
    left: 700,
  },
]

export class Option {
  constructor(relatedScene, optionIndex, value) {
    this.relatedScene = relatedScene;
    this.optionIndex = optionIndex;
    this.option = relatedScene.add.image(positions[optionIndex].left, positions[optionIndex].top, 'laser' + optionIndex).setScale(1.4).setInteractive();
    this.text = relatedScene.add.text(positions[optionIndex].left - 14, positions[optionIndex].top - 18, value, {
      fontFamily: 'helvetica, verdana, arial', fontSize: '26px', fill: '#ffc'
    });

    this.option.on('pointerdown', () => {
      this.relatedScene.optionChoose(this.optionIndex);
    });
  }

  setText(text) {
    this.text.setText(text);
  }

}