import { Application, Text } from 'pixi.js';

// Application bundles the renderer, the root container (stage) and the ticker (game loop).
const app = new Application({
  resizeTo: window,
  background: '#1a1a2e',
  antialias: false, // pixel art: keep edges crisp
});

document.body.appendChild(app.view as HTMLCanvasElement);

const hello = new Text('pixi-catcher: setup OK', { fill: '#ffffff', fontSize: 24 });
hello.anchor.set(0.5);
hello.position.set(app.screen.width / 2, app.screen.height / 2);
app.stage.addChild(hello);
