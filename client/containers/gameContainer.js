import { connect } from 'react-redux';

import { Game } from '../components/game.jsx';

const mapStateToProps = state => {
  return {
    id: state.game.id,
    players: state.game.players || []
  };
};

export const GameContainer = connect(
  mapStateToProps
)(Game);
