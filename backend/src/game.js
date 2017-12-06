const PLAYER_LIMIT = 1;
const TICK_INTERVAL_MS = 750;

class Game {
  constructor(io) {
    this.id = (Math.random() * 100000).toFixed(0);
    this._io = io;
    this._players = [];
  }

  isAvailable() {
    return this._players.length < PLAYER_LIMIT;
  }

  addUser(user) {
    if (this._players.length >= PLAYER_LIMIT) return;

    this._players.push(user);
    user.connection.emit('JOIN_GAME', this.id);

    console.log(`User #${user.id} joined game #${this.id}`);

    if (this._players.length === PLAYER_LIMIT) this.startGame();
  }

  startGame() {
    console.log(`Starting game ${this.id}`);

    setInterval(() => {
      this._players.forEach(aPlayer => {
        aPlayer.connection.emit('delta');
      });

    }, TICK_INTERVAL_MS);
  }
}

module.exports = Game;
