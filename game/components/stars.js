import { shuffle } from '../libs/shuffle-array.js';

let freePositions = [];
let ocupiedPositions = [];


for(let i = 0; i < 11; i++) {
  freePositions.push(getStarElement((70 * i) + 15));
}

function getStarElement(x) {
  return {
    x,
    y: 12,
  }
}


export class Stars {
  constructor(relatedScene) {
    this.relatedScene = relatedScene;
    this.stars = this.relatedScene.physics.add.group();
    this.createStars();
    // colisión de las estrellas con el suelo
    this.relatedScene.physics.add.collider(this.stars, this.relatedScene.platforms);

    // colisión de las estrellas con el personaje
    this.relatedScene.physics.add.overlap(this.relatedScene.player, this.stars, this.collectStar, null, this);
  }

  createStars(number = 3) {
    //console.log('me han pedido colocar ', number , 'estrellas y tengo ', freePositions.length , ' free positions');
    freePositions = shuffle(freePositions);

    for(let i = 0; i < number; i++) {
      if (freePositions.length == 0) {
        break;
      }
      let item = freePositions.pop();
      //console.log('cloca estrella ' , item);
      this.stars.create(item.x, item.y, 'star');
    }
    
  }

  collectStar(player, star) {
    //console.log('colectada', star);
    freePositions.push(getStarElement(star.x));
    //console.log(freePositions);
    star.disableBody(true, true);
    this.relatedScene.score += 10;
    this.relatedScene.refreshScore();
  }
}