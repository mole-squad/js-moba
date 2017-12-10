import {
  GAME_ABANDONED,
  GAME_DELTA,
  JOIN_GAME,
  SETTINGS_LOADED
} from '../actions/game';

export function game(state={}, action) {
  switch (action.type) {
    case JOIN_GAME:
      return Object.assign({}, state, { id: action.gameId });

    case GAME_DELTA:
      return Object.assign({}, state, action.delta);

    case SETTINGS_LOADED:
      return Object.assign({}, state, { settings: action.settings });

    case GAME_ABANDONED:
      return {};
    default:
      return state;
  }
}
