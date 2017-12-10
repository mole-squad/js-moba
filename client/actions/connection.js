export const SET_CONNECTION = 'SET_CONNECTION';
export function setConnection(socket) {
  return {
    type: SET_CONNECTION,
    socket
  };
}

export const EMIT_ACTION = 'EMIT_ACTION';
export function emitAction(action) {
  return {
    type: EMIT_ACTION,
    action
  };
}
