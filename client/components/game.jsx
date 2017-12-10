import React from 'react';

import { GameCanvas } from './gameCanvas.jsx';
import { PlayerBadge } from './playerBadge.jsx';

export function Game({ game, onAction }) {

  if (!game.settings || !game.isStarted) {
    return (<div>Loading…</div>)
  }

  const rows = game.players.map(aPlayer => {
    return (<PlayerBadge player={aPlayer} key={aPlayer.id} />)
  });

  return(
    <div style={styles.container}>
      <div style={styles.canvas}>
        <GameCanvas
          players={game.players}
          onAction={onAction}
          settings={game.settings}
        />
      </div>

      <div style={styles.scoreboard}>
        <h1>Game #{game.id}</h1>
        <h2>Players:</h2>
        {rows}

      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '50px',
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
  canvas: {
    width: '500px',
    height: '500px',
    border: '1px solid #CECECE'
  },
  scoreboard: {
    padding: '15px 25px',
    border: '1px solid #CECECE'
  }
};
