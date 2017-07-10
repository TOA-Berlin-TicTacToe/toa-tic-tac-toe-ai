const isDiagWin = (board, player) => {
  return (board[0][0] === player && board[1][1] === player && board[2][2] === player)
    || (board[0][2] === player && board[1][1] === player && board[2][0] === player);
};

const isRowWin = (board, player) => {
  const size = board.length;
  for (let y = 0; y < size; y++) {
    if (board[y][0] === player && board[y][1] === player && board[y][2] === player) {
      return true;
    }
  }
  return false;
};

const isColWin = (board, player) => {
  const size = board.length;
  for (let x = 0; x < size; x++) {
    if (board[0][x] === player && board[1][x] === player && board[2][x] === player) {
      return true;
    }
  }
  return false;
};

const isWin = (board, player) => {
  return isDiagWin(board, player) || isRowWin(board, player) || isColWin(board, player);
};

const getUtility = (board, players) => {
  if (isWin(board, players[0])) {
    return 10;
  } else if (isWin(board, players[1])) {
    return -10;
  } else {
    return 0;
  }
};

const createNode = (board, action) => {
  return {board, action};
};

const doAction = (board, action, player) => {
  const newBoard = board.map(x => x.slice());
  newBoard[action.y][action.x] = player;
  return newBoard;
};

const getSuccessors = (board, player, players) => {
  if (isWin(board, players[0]) || isWin(board, players[1])) {
    return [];
  }

  const size = board.length;
  const successors = [];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (board[y][x] === '') {
        successors.push(createNode(doAction(board, {x, y}, player), {x, y}));
      }
    }
  }

  return successors;
};

const minimax = (board, isMaxPlayer, players) => {
  const successors = getSuccessors(board, players[isMaxPlayer ? 0 : 1], players);
  if (successors.length === 0) {
    return getUtility(board, players);
  }

  if (isMaxPlayer) {
    let bestValue = -Infinity;
    for (let i = 0; i < successors.length; i++) {
      const value = minimax(successors[i].board, false, players);
      bestValue = Math.max(value, bestValue);
    }
    return bestValue;
  } else {
    let bestValue = Infinity;
    for (let i = 0; i < successors.length; i++) {
      const value = minimax(successors[i].board, true, players);
      bestValue = Math.min(value, bestValue);
    }
    return bestValue;
  }
};

const getOtherPlayer = (players, player) => {
  return players.filter(x => x !== player)[0];
};

export const move = (game) => {
  const players = [game.turn, getOtherPlayer(game.players, game.turn)];
  const successors = getSuccessors(game.board, game.turn, players);
  let bestSuccessor = {value: -Infinity, action: null};
  for (let i = 0; i < successors.length; i++) {
    const successor = successors[i];
    const value = minimax(successor.board, false, players, -Infinity, Infinity);
    bestSuccessor = value > bestSuccessor.value
      ? {value, action: successor.action} : bestSuccessor;
  }
  return bestSuccessor.action;
};

