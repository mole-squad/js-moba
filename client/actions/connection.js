export const SET_CONNECTION = 'SET_CONNECTION';
export function setConnection(socket) {
  return {
    type: SET_CONNECTION,
    socket
  };
}
