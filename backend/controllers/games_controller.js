const games_repository = require('../repositories/games')();
const Game = require('../models/game');

exports.assignUserToGame = (user, socket) => {
  let game;

  available_games = games_repository.availableGames();

  if (available_games.length !== 0) {
    game = available_games[0];
  } else {
    game = new Game();
  }

  game.addUser(user);

  return game;
}

exports.onDisconnect = (game, user) => {
  game.disconnect(user);
  // this._games.splice(index, 1);

  // abandonedPlayers.forEach(aPlayer => {
  //   console.log(`Reassigning player #${aPlayer.id}`);
  //   this.assignUserToGame(aPlayer)
  // });
}
