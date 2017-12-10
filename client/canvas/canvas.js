import { Drawable } from './drawable';
import { Player } from './player';

import {
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three';

const HEIGHT = 500;
const WIDTH = 750;

const CAMERA_HEIGHT = 150;
const CAMERA_WIDTH = 300;

export class Canvas {

  constructor(container, initialState) {
    const { settings, players } = initialState;

    this._scene = new Scene();
    this._camera = new PerspectiveCamera( 75, WIDTH / HEIGHT, 0.1, 1000 );
    this._renderer = new WebGLRenderer();

    this._camera.position.z = 5;
    this._renderer.setSize(settings.RENDER_WIDTH, settings.RENDER_HEIGHT);

    // var geometry = new BoxGeometry( 1, 1, 1 );
    // var material = new MeshBasicMaterial( { color: 0x00ff00 } );
    // var cube = new Mesh( geometry, material );
    // this._scene.add( cube );

    this.players = {};

    initialState.players.forEach(aPlayer => {
      this.players[aPlayer.id] = new Player(this._scene, aPlayer)
    });

    container.appendChild(this._renderer.domElement);

  }

  render(state) {
    state.players.forEach(aPlayer => {
      const p = this.players[aPlayer.id];

      if (p) {
        p.update(aPlayer)
      } else {
        console.log('wtf')
        console.log(this.players);
      }

    });

    this._renderer.render(this._scene, this._camera);

    return;
    if (!state.players) return;

    state.players.forEach(aPlayer => {
      const playerObj = new Player(this._elm, aPlayer);
      playerObj.render();
    });
  }

  clear() {
    // this.ctx.clearRect(0, 0, this._elm.width, this._elm.height);
  }
}
