import * as PIXI from "pixi.js";
export const game = (height, width, nbOfExplosions) => {
  const app = new PIXI.Application({
    autoStart: false,
    // resizeTo: window,
    width,
    height,
    backgroundColor: 0x1099bb,
  });

  document.onreadystatechange = () => {
    document.getElementById("game").appendChild(app.view);

    PIXI.Assets.load("https://pixijs.com/assets/bg_grass.jpg").then(
      (texture) => {
        const plane = new PIXI.SimplePlane(texture, 10, 10);

        plane.x = -10;
        plane.y = -10;

        app.stage.addChild(plane);

        // Get the buffer for vertice positions.
        const buffer = plane.geometry.getBuffer("aVertexPosition");

        // Listen for animate update
        let timer = 0;

        app.ticker.add(() => {
          // Randomize the vertice positions a bit to create movement.
          for (let i = 0; i < buffer.data.length; i++) {
            buffer.data[i] += Math.sin(timer / 10 + i) * 0.5;
          }
          buffer.update();
          timer++;
        });
      }
    );

    PIXI.Assets.load("https://pixijs.com/assets/spritesheet/mc.json").then(
      () => {
        // create an array to store the textures
        const explosionTextures = [];
        let i;

        for (i = 0; i < 26; i++) {
          const texture = PIXI.Texture.from(
            `Explosion_Sequence_A ${i + 1}.png`
          );

          explosionTextures.push(texture);
        }

        for (i = 0; i < nbOfExplosions; i++) {
          // create an explosion AnimatedSprite
          const explosion = new PIXI.AnimatedSprite(explosionTextures);

          explosion.x = Math.random() * app.screen.width / 4;
          explosion.y = Math.random() * app.screen.height / 4;
          explosion.anchor.set(0.5);
          explosion.rotation = Math.random() * Math.PI;
          explosion.scale.set(0.75 + Math.random() * 0.5);
          explosion.gotoAndPlay((Math.random() * 26) | 0);
          app.stage.addChild(explosion);
        }

      }
    );

    // start animating
    app.start();
  };
};
export default game;
