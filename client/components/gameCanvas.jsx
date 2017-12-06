import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Canvas } from '../canvas/canvas';

export class GameCanvas extends Component {
  componentDidMount() {
    const canvasElm = ReactDOM.findDOMNode(this.refs.myCanvas),
      canvas = new Canvas(canvasElm);

    var self = this;

    const tick = () => {
      canvas.render({
        players: self.props.players
      });

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  render() {
    return (
      <canvas style={styles.canvas} ref="myCanvas"></canvas>
    );
  }
}

const styles = {
  canvas: {
    width: '100%',
    height: '100%'
  }
};
