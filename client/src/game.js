export default class Game {
  constructor(id, connection) {
    this.id = id;
    this._connection = connection;

    this._connection.on('JOIN_GAME', gameId => console.log(`joined game ${gameId}`));
    this._connection.on('delta', delta => this.onUpdate(delta));
  }

  onUpdate(delta) {
    console.log(`Delta: ${JSON.stringify(delta, null, 2)}`);
  }
}
