import { combineReducers } from 'redux';

import { board } from './board';
import { connection } from './connection';
import { game } from './game';

export const rootReducer = combineReducers({
  board,
  connection,
  game
});
