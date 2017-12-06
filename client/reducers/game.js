import { GAME_DELTA, JOIN_GAME } from '../actions/game';

export function game(state={}, action) {
  switch (action.type) {
    case JOIN_GAME:
      return Object.assign({}, state, { id: action.gameId });

    case GAME_DELTA:
      return Object.assign({}, state, action.delta);

    default:
      return state;
  }
}
