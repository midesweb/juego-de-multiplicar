let doorPositions = [
  
  
  {
    x: 380,
    y: 400
  },
  {
    x: 769,
    y: 272
  },
  {
    x: 130,
    y: 348
  },
  {
    x: 627,
    y: 194
  },
  {
    x: 25,
    y: 348
  },
  {
    x: 649,
    y: 348
  },
  {
    x: 420,
    y: 120
  },
  {
    x: 540,
    y: 383
  },
  {
    x: 130,
    y: 348
  },
  {
    x: 240,
    y: 150
  },
  {
    x: 25,
    y: 348
  },
]

export class Door {
  constructor(scene) {
    this.componentScene = scene;
    this.createDoor();
  }

  createDoor() {
    let level = this.componentScene.registry.get('level');
    this.posX = doorPositions[level - 1].x;
    this.posY = doorPositions[level - 1].y;
    this.door = this.componentScene.physics.add.image(this.posX, this.posY, 'door');
    this.door.body.setAllowGravity(false);
    this.componentScene.physics.add.overlap(this.componentScene.player, this.door, this.enterDoor, null, this);
  }

  enterDoor() {
    console.log('entrand...');
    this.moveDoor();
    // Cambio la escena dejando la presente escena "pausada"
    this.componentScene.scene.switch('quizz');
    this.componentScene.events.emit('quizz-start' /*…*/);
    this.componentScene.playerStop();
  }

  moveDoor() {
    let level = this.componentScene.registry.get('level');
    this.posX = doorPositions[level].x;
    this.posY = doorPositions[level].y;
    this.door.setPosition(this.posX, this.posY);
  }

}