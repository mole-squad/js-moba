import React from 'react';

export function PlayerBadge({ player }) {
  const badgeStyle = Object.assign({}, styles.badge, {
    backgroundColor: player.color
  });

  return (
    <div style={styles.card}>
      <div style={badgeStyle}></div>
      <h3 style={styles.title}>{player.id}</h3>
    </div>
  );
}

const styles = {
  badge: {
    height: '25px',
    width: '25px',
    borderRadius: '3px'
  },
  card: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    margin: '0 10px'
  }
}
