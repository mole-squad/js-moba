class Games {
  constructor() {
    this.games = [];
  }

  get(game_id) {
    return this.games.find(game => game.id == game_id);
  }

  availableGames() {
    return this.games.filter(aGame => aGame.isAvailable());
  }

  // private

  _addGame(game) {
    this.games.push(game);
  }
}

let instance;

module.exports = function() {
  instance = instance || new Games();
  return instance;
}
