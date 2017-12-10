import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Canvas } from '../canvas/canvas';
import { ACTION_KEYCODE_MAP } from '../actions/userActionTypes';

export class GameCanvas extends Component {
  componentDidMount() {
    this.id = Date.now();
    const canvasElm = ReactDOM.findDOMNode(this.refs.myCanvas),
      canvas = new Canvas(canvasElm, this.getState());

    document.addEventListener("keydown", this.onKeyDown.bind(this));

    var self = this;

    const tick = () => {
      canvas.clear();
      canvas.render(self.getState());

      self.animationId = requestAnimationFrame(tick);
    };

    this._started = true;
    self.animationId = requestAnimationFrame(tick);
  }

  getState() {
    return {
      id: this.id,
      settings: this.props.settings,
      players: this.props.players
    };
  }

  componentWillUnmount() {
    console.log('unmount');
    cancelAnimationFrame(this.animationId);
  }

  render() {
    return (<div ref="myCanvas"></div>);
  }

  onKeyDown(event) {
    const action = ACTION_KEYCODE_MAP[event.keyCode];
    if (action) {
      event.preventDefault();
      this.props.onAction(action)
    };
  }
}

const styles = {
  canvas: {

  }
};
