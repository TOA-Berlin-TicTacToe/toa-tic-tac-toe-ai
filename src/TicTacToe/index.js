import React from 'react';
import withTicTacToe from '../withTicTacToe';
import Lobby from '../Lobby';
import Game from '../Game';

function TicTacToe({ game, games, isInGame, hasPendingGame, actions, username }) {
  if (isInGame) {
    return (
      <Game
        game={game}
        currentPlayer={username}
        onCellClick={actions.move}
        onCancel={actions.leave}
      />
    );
  }

  return (
    <Lobby
      hasPendingGame={hasPendingGame}
      games={games}
      onJoin={actions.join}
      onCreate={actions.create}
      name={username}
    />
  );
}

export default withTicTacToe(TicTacToe);
