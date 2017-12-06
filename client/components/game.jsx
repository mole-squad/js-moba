import React from 'react';

export function Game({ id, players }) {
  const rows = players.map(aPlayer => {
    return (
      <li key={aPlayer.id} style={{ backgroundColor: aPlayer.color }}>
        {aPlayer.id}
      </li>
    );
  });

  return(
    <div>
      <h1>{id}</h1>
      <ul>{rows}</ul>
    </div>
  );
}
