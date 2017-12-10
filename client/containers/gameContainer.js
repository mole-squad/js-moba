import { connect } from 'react-redux';

import { Game } from '../components/game.jsx';
import { emitAction } from '../actions/connection';

const mapStateToProps = state => {
  return {
    game: state.game
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAction: (action) => {
      dispatch(emitAction(action));
    }
  };
};

export const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
