import { Drawable } from './drawable';

const PLAYER_DIMENSION = 15;

export class Player extends Drawable {
  constructor(canvasElm, userState) {
    super(canvasElm);
    this.state = userState;
  }

  render() {
    if (!this.state.position) return;

    this.ctx.fillStyle = this.state.color;
    this.ctx.fillRect(
      this.state.position.x,
      this.state.position.y,
      PLAYER_DIMENSION,
      PLAYER_DIMENSION / 2
    );
  }
}
