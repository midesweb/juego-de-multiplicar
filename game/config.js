export const createConfig = (scenes) => {
 return  {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    scene: scenes,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
  }
}