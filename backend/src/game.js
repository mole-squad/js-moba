const PLAYER_LIMIT = 2;
const TICK_INTERVAL_MS = 20;

class Game {
  constructor(io) {
    this.id = (Math.random() * 100000).toFixed(0);
    this._io = io;
    this.tickNo = 0;
    this._players = [];
    this._bufferedActions = [];
    this._actionsByTick = {};
    this._isStarted = false;
  }

  isAvailable() {
    return this._players.length < PLAYER_LIMIT;
  }

  addUser(user) {
    if (this._players.length >= PLAYER_LIMIT) return;

    this._players.push(user);

    user.connection.on('action', action => this.onAction(user, action));
    user.connection.on('disconnect', () => this.onDisconnect(user));

    user.connection.emit('JOIN_GAME', this.id);

    console.log(`User #${user.id} joined game #${this.id}`);

    if (this._players.length === PLAYER_LIMIT) this.startGame();
  }

  startGame() {
    this._broadcastMessage('GAME_SETTINGS', {
      RENDER_WIDTH: 1000,
      RENDER_HEIGHT: 750
    });

    if (this._isStarted) {
      console.error(`Failed to start game #${this.id}: Game already in progress`);
      return;
    }

    this._isStarted = true;
    console.log(`Starting game #${this.id}`);

    this._intervalId = setInterval(() => {
      this.processActions();
      this.emitDelta();

      this.tickNo++;
    }, TICK_INTERVAL_MS);
  }

  _broadcastMessage(key, value) {
    this._players.forEach(aPlayer => {
      aPlayer.connection.emit(key, value);
    });
  }

  emitDelta() {
    const state = {
      players: this._players.map(player => player.getState()),
      isStarted: this._isStarted
    };

    this._broadcastMessage('delta', state);
  }

  processActions() {
    const actions = this._actionsByTick[this.tickNo] = this._bufferedActions.slice();
    this._bufferedActions = [];

    actions.forEach(({ user, action }) => {
      user.onAction(action);
    });
  }

  onAction(user, action) {
    console.log(`ACTION: #${user.id} ${action}`);
    this._bufferedActions.push({ user, action });
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
