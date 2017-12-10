import { SET_CONNECTION, EMIT_ACTION } from '../actions/connection';

const initialState = {
  actions: [],
  socket: null
};

export function connection(state=initialState, action) {
  switch (action.type) {
    case SET_CONNECTION:
      return setConnection(state, action);

    case EMIT_ACTION:
      return onUserAction(state, action);

    default:
      return state;
  }
}

function onUserAction(state, action) {
  if (state.socket) {
    emitUserAction(state.socket, action.action);
  }

  const updatedActions = state.actions.slice();
  updatedActions.push(action.action);

  return Object.assign({}, state, {
    actions: updatedActions
  });
}

function setConnection(state, action) {
  if (state.socket) return state;

  if (state.actions.length) {
    state.actions.forEach(userAction => emitUserAction(action.socket, userAction));
  }

  return Object.assign({}, state, {
    socket: action.socket
  });
}

function emitUserAction(socket, payload) {
  console.log(payload);
  socket.emit('action', payload);
}
