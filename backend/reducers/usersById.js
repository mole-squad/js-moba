const { NEW_USER, USER_DISCONNECT } = require('../actions/users');

function usersById(state = {}, action) {
  switch (action.type) {
    case NEW_USER:
      if (action.connection) {

        console.log(`User ${action.connection.id} connected`);
        return Object.assign({}, state, {
          id: action.connection.id,
          connection: action.connection
        });
      }

    case USER_DISCONNECT:
      if (action.connection) {
        console.log(`User ${action.connection.id} disconnected`);
        return Object.assign({}, state, {
          [action.connection.id]: null
        });
      }

    default:
      return state;
  }
}

module.exports = usersById;
