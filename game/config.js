export const createConfig = (scenes) => {
 return  {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    scene: scenes,
   scale: {
     mode: Phaser.Scale.FIT,
     autoCenter: Phaser.Scale.CENTER_BOTH
   },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
   scale: {
     mode: Phaser.Scale.FIT,
     autoCenter: Phaser.Scale.CENTER_BOTH
   },
  }
}