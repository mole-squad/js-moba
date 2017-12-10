const games_repository = require('../repositories/games')();
const PLAYER_LIMIT = 2;
const TICK_INTERVAL_MS = 20;

class Game {
  constructor() {
    this.id = (Math.random() * 100000).toFixed(0);
    this.availableColors = COLOR_OPTIONS.slice();
    this.tickNo = 0;
    this._players = [];
    this._bufferedActions = [];
    this._actionsByTick = {};
    this._isStarted = false;
    this._onDestroy = onDestroy;
    this._games_repository = games_repository;
  }

  save() {
    this._games_repository._addGame(this);
  }

  isAvailable() {
    return this._players.length < PLAYER_LIMIT;
  }

  addUser(user) {
    if (this._players.length >= PLAYER_LIMIT) return;

    console.log(`User #${user.id} joined game #${this.id}`);
    this._players.push(user);

    // Set color
    const colorIndex = Math.floor(Math.random() * this.availableColors.length);
    user.setColor(this.availableColors[colorIndex]);
    this.availableColors.splice(colorIndex, 1);

    // Socket events
    user.connection.on('action', action => this.onAction(user, action));
    // user.connection.on('disconnect', () => this.disconnect(user));
    user.connection.on('ACK', () => user.resetTimer());

    user.connection.emit('JOIN_GAME', this.id);

    if (this._players.length === PLAYER_LIMIT) this.startGame();
    return true;
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

    this._players.forEach(aPlayer => aPlayer.onGameStart());

    this._isStarted = true;
    console.log(`Starting game #${this.id}`);

    this._intervalId = setInterval(() => {
      this.timeoutInactiveUsers();
      this.processActions();
      this.emitDelta();

      this.tickNo++;
    }, TICK_INTERVAL_MS);
  }

  timeoutInactiveUsers() {
    this._players.forEach(aPlayer => {
      if (aPlayer.isInactive()) {
        this.disconnect(aPlayer, true);
      }
    });
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

  disconnect(user, isTimeout) {
    if (isTimeout) {
      console.log(`User timed out: #${user.id}`);
    } else {
      console.log(`User disconnected: #${user.id}`);
    }

    const playerIndex = this._players.indexOf(user);
    this._players.splice(playerIndex, 1);

    this._broadcastMessage('USER_DISCONNECT', user.id);
    this._broadcastMessage('GAME_ABANDONED', this.id);

    this.onDestroy();
  }

  destroy() {
    this._games_repository.get()
  }

  onDestroy() {
    this._isStarted = false;
    clearInterval(this._intervalId);
    this._players.forEach(aPlayer => aPlayer.reset())
  }
}

const COLOR_OPTIONS = [
  '#C91F37',
  '#F47983',
  '#875F9A',
  '#BF55EC',
  '#22A7F0',
  '#1F4788',
  '#006442',
  '#36D7B7',
  '#F5D76E',
  '#BFBFBF',
  '#EEEEEE'
];

module.exports = Game;
