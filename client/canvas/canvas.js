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
    this._camera = new PerspectiveCamera( 75, settings.RENDER_WIDTH / settings.RENDER_HEIGHT, 0.1, 1000 );
    this._renderer = new WebGLRenderer();

    this._camera.position.z = 5;
    this._renderer.setSize(settings.RENDER_WIDTH, settings.RENDER_HEIGHT);

    this.players = {};
    this.state = initialState;
    initialState.players.forEach(aPlayer => {
      this.players[aPlayer.id] = new Player(this._scene, aPlayer)
    });

    container.appendChild(this._renderer.domElement);
  }

  render(state) {
    this.state = state;
    state.players.forEach(aPlayer => {
      this.players[aPlayer.id].update(aPlayer)
    });

    this._renderer.render(this._scene, this._camera);
  }

  clear() {
    // this.ctx.clearRect(0, 0, this._elm.width, this._elm.height);
  }
}
