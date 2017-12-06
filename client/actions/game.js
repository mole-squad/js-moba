export const JOIN_GAME = 'JOIN_GAME';
export function joinGame(gameId) {
  return {
    type: JOIN_GAME,
    gameId
  };
}

export const GAME_DELTA = 'GAME_DELTA';
export function gameDelta(delta) {
  return {
    type: GAME_DELTA,
    delta
  };
}
