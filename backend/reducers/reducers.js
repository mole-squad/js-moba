const { combineReducers } = require('redux');

const { gamesById, userIdToGameId } = require('./games');
const usersById = require('./usersById');

module.exports = combineReducers({
  gamesById,
  userIdToGameId,
  usersById
});
