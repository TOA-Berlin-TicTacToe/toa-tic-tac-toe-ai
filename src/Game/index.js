import React from 'react';
import Board from '../Board';
import cN from 'classnames';
import './style.css';

const getHeader = (isTurn, status, currentPlayer) => {
  if (status.type === 'ONGOING') {
    return isTurn ?
      'Make your move!' :
      'Waiting for other player...';
  }

  if (status.winner === currentPlayer) {
    return 'You won!'
  }

  if (status.winner === 'DRAW') {
    return 'Two masters at play! It\'s a draw!';
  }

  return 'You lost...';
};

export default function Game({ className, game, currentPlayer, onCellClick, onCancel }) {
  const { board, turn, players, status } = game;

  const [x, o] = players;
  const isTurn = turn === currentPlayer;
  const isFinished = status.type === 'FINISHED';

  return (
    <div className={cN(className, 'game')}>
      <div className="game-inner">
        <h1 className={`game-area-header ${isTurn || isFinished ? 'game-area-header-active' : ''}`}>
          {getHeader(isTurn, status, currentPlayer)}
        </h1>
        <div className="game-area">
          <Board className="game-board" board={board} players={players} onClick={(y, x) => onCellClick({ y, x })} />
          <Player className="game-area-player" name={x} cell="x" active={turn === x} />
          <Player className="game-area-player" name={o} cell="o" active={turn === o} />
        </div>
        <button onClick={onCancel}
          className="button button-reset">
          leave
        </button>
        </div>
    </div>
  );
}

function Player({ className, name, cell, active }) {
  return (
    <div className={`${className} player player-${cell} ${active ? 'player-active' : ''}`}>
      <div className={`player-cell player-cell-${cell}`} />
      <div>{name}</div>
    </div>
  );
}
