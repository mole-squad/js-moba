const Game = require('./game');
const User = require('./user');

class GameManager {
  constructor(io) {
    this._io = io;
    this._games = [];
    this._connectionsById = new Map();

    this._io.on('connection', (socket) => this.onNewUser(socket));
  }

  onNewUser(socket) {
    const user = new User(socket);

    this._connectionsById.set(user.id, user);

    console.log(`User Connected: #${user.id}`);

    socket.on('disconnect', () => this._connectionsById.delete(user.id));

    this.assignUserToGame(user);
  }

  onGameEnd(game, abandonedPlayers) {
    const index = this._games.findIndex(aGame => aGame.id === game.id);
    this._games.splice(index, 1);

    abandonedPlayers.forEach(aPlayer => {
      console.log(`Reassigning player #${aPlayer.id}`);
      this.assignUserToGame(aPlayer)
    });
  }

  assignUserToGame(user) {
    if (this._games.filter(aGame => aGame.isAvailable()).length === 0) {
      const newGame = new Game(this._io, players => this.onGameEnd(newGame, players));
      this._games.push(newGame);
    }

    for (let i = 0; i < this._games.length; i++) {
      if (this._games[i].isAvailable()) {
        if (this._games[i].addUser(user)) {
          break;
        } else {
          console.error(`Failed to add user #${user.id} to game #${this._games[i].id}`);
        }
      }
    }
  }
}

module.exports = GameManager;
