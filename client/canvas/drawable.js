export class Drawable {
  constructor(canvasElm) {
    this._elm = canvasElm;
    this.ctx = this._elm.getContext('2d');
  }

  render(ctx) { }
}
