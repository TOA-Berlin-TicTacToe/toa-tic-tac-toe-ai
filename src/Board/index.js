import React from 'react';
import cN from 'classnames';
import './style.css';

const getMark = (players, player) => ['x', 'o'][players.indexOf(player)] || null;

export default function Board({ className, players, board, onClick }) {
  return (
    <div className={cN('board', className)}>
      {
        board.map((row, ridx) => (
          row.map((player, cidx) => (
            <Cell
              key={ridx + '_' + cidx}
              cell={getMark(players, player)}
              onClick={() => onClick(ridx, cidx)} />
          )
        )))
      }
    </div>
  )
}

function Cell({ cell, onClick }) {
  const className = cN('board-cell', `board-cell-${cell || 'blank'}`);

  return (
    <div className={className} >
      { cell || <button onClick={onClick} className="board-cell-button">empty</button> }
    </div>
  )
}
