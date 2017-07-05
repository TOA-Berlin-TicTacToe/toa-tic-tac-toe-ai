import React from 'react';
import cN from 'classnames';
import GameList from '../GameList';
import './style.css';

export default function Lobby({ className, hasPendingGame, games, onJoin, onCreate, onChangeName, name }) {
  return (
    <div className={cN('lobby', className)}>
      <div className="lobby-inner">
        <h1>Hello {name}</h1>
        <div className="lobby-buttons">
          <button
            disabled={!name || hasPendingGame}
            onClick={onCreate}
            className="button button-reset"
            type="button">
            create new game
          </button>
          <button
            disabled={!name || (games && games.length === 0)}
            onClick={onJoin}
            className="button button-reset"
            type="button">
            join random game
          </button>
        </div>
        <div>
          <h3>Pending Games</h3>
          <GameList name={name} games={games} onJoin={onJoin} />
        </div>
      </div>
    </div>
  );
}
