import React from 'react';

import { PlayerBadge } from './playerBadge.jsx';

export function Game({ id, players }) {
  const rows = players.map(aPlayer => {
    return (<PlayerBadge player={aPlayer} key={aPlayer.id} />)
  });

  return(
    <div style={styles.container}>
      <canvas style={styles.canvas}></canvas>

      <div style={styles.scoreboard}>
        <h1>Game #{id}</h1>
        <div style={styles.playerList}>
          <h2>Players:</h2>
          {rows}
        </div>
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
  },
  playerList: {

  }
};
