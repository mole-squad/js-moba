const PLAYER_LIMIT = 2;
const TICK_INTERVAL_MS = 2000;

class Game {
  constructor(io) {
    this.id = (Math.random() * 100000).toFixed(0);
    this._io = io;
    this._players = [];
    this._bufferedActions = [];
    this._actionsByTick = {};
  }

  isAvailable() {
    return this._players.length < PLAYER_LIMIT;
  }

  addUser(user) {
    if (this._players.length >= PLAYER_LIMIT) return;

    this._players.push(user);
    user.connection.on('disconnect', () => this.onDisconnect(user));

    user.connection.emit('JOIN_GAME', this.id);

    console.log(`User #${user.id} joined game #${this.id}`);

    if (this._players.length === PLAYER_LIMIT) this.startGame();
  }

  startGame() {
    console.log(`Starting game #${this.id}`);

    this._io.on('action', action => {
      debugger;
      this.onAction(action);
    });

    setInterval(() => {

      this.emitDelta();
    }, TICK_INTERVAL_MS);
  }

  _broadcastMessage(key, value) {
    this._players.forEach(aPlayer => {
      aPlayer.connection.emit(key, value);
    });
  }

  emitDelta() {
    const state = {
      players: this._players.map(player => player.getState())
    };

    this._broadcastMessage('delta', state);
  }

  onAction(action) {

  }

  onDisconnect(user) {
    console.log(`User disconnected: #${user.id}`);
    const playerIndex = this._players.indexOf(user);
    this._players.splice(playerIndex, 1);

    this._broadcastMessage('USER_DISCONNECT', user.id);
    this._broadcastMessage('GAME_ABANDONED', this.id);
  }
}

module.exports = Game;
