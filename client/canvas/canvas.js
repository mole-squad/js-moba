import { Drawable } from './drawable';
import { Player } from './player';

export class Canvas extends Drawable {
  render(state) {
    this.ctx.clearRect(0, 0, 100, 100);

    if (!state.players) return;

    state.players.forEach(aPlayer => {
      const playerObj = new Player(this._elm, aPlayer);
      playerObj.render();
    });
  }
}
