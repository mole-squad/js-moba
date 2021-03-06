import { BoxGeometry, Mesh, MeshBasicMaterial} from 'three';

const PLAYER_DIMENSION = 15;

export class Player {
  constructor(scene, userState) {
    this._geometry = new BoxGeometry( 1, 1, 1 );
    this._material = new MeshBasicMaterial( { color: userState.color } );
    this._mesh = new Mesh(this._geometry, this._material);

    scene.add(this._mesh);
    this.update(userState);
  }

  update(state) {
    this.state = state;
    console.log(this.state.position);
    if (!this.state.position) return;

    this._mesh.position.x = 3; //this.state.position.x;
    this._mesh.position.y = 3;//this.state.position.y;
  }
}
