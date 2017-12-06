const { NEW_USER, USER_DISCONNECT } = require('../actions/users');

const dummyGame = {
  id: '1',
  players: [],
  isStarted: false,
  boardId: '1'
};

const initialState = {
  '1': dummyGame
};

function gamesById(state = initialState, action) {
  switch (action.type) {
    case NEW_USER:

    case USER_DISCONNECT:
    default:
      return state;
  }
}

module.exports = {
  gamesById,
  userIdToGameId
};
