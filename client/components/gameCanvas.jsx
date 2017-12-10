import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Canvas } from '../canvas/canvas';
import { ACTION_KEYCODE_MAP } from '../actions/userActionTypes';

export class GameCanvas extends Component {
  componentDidMount() {
    const canvasElm = ReactDOM.findDOMNode(this.refs.myCanvas),
      canvas = new Canvas(canvasElm, this.getState());

    document.addEventListener("keydown", this.onKeyDown.bind(this));

    var self = this;

    const tick = () => {
      canvas.clear();
      canvas.render(self.getState());

      requestAnimationFrame(tick);
    };

    this._started = true;
    requestAnimationFrame(tick);
  }

  getState() {
    return {
      settings: this.props.settings,
      players: this.props.players
    };
  }

  ready() {
    const { players, settings } = this.props;
    return players && players.length && settings;
  }

  render() {
    return (<div ref="myCanvas"></div>);
  }

  onKeyDown(event) {
    const action = ACTION_KEYCODE_MAP[event.keyCode];
    if (action) this.props.onAction(action);
  }
}

const styles = {
  canvas: {

  }
};
