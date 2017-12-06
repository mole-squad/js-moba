import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux';

import { setConnection } from './actions/connection';
import { gameDelta, joinGame } from './actions/game';
import { GameContainer } from './containers/gameContainer';
import { rootReducer } from './reducers/rootReducer';

const store = createStore(rootReducer);

export default class App extends Component {
  componentDidMount() {
    const socket = io();
    store.dispatch(setConnection(socket));

    socket.on('message', (msg) => {
      console.log(msg);
    });

    socket.on('JOIN_GAME', gameId => store.dispatch(joinGame(gameId)));
    socket.on('delta', delta => store.dispatch(gameDelta(delta)));
  }

  render() {
    return (
      <Provider store={store}>
        <GameContainer />
      </Provider>
    )
  }
}
