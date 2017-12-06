import { combineReducers } from 'redux';

import { board } from './board';
import { game } from './game';

export const rootReducer = combineReducers({
  board,
  game
});
