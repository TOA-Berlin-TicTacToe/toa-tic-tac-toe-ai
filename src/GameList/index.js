import React from 'react';
import './style.css';

export default function GameList({ name, games = [], onJoin }) {
  if (!games.length) {
    return (
      <div>No games present</div>
    );
  }

  return (
    <ul className="game-list">
      {games.map((game) => (
        <li key={game.gameUid}>
          <button
            className="button"
            onClick={() => onJoin(game.gameUid)}
            disabled={game.players[0] === name}>
            {game.players[0]}
          </button>
        </li>
      ))}
    </ul>
  );
}
