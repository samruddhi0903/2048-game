import { TILE_4_PROBABILITY, DIRECTIONS } from './constants';

export const initializeBoard = (size = 4) => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );
};

export const getEmptyCells = (board) => {
  return board.flatMap((row, rowIndex) =>
    row.map((cell, colIndex) => (cell === 0 ? { row: rowIndex, col: colIndex } : null)).filter(Boolean)
  );
};

export const addRandomTile = (board) => {
    const emptyCells = getEmptyCells(board);
    if (emptyCells.length === 0) return board;
    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newValue = Math.random() < TILE_4_PROBABILITY ? 4 : 2;
    const newBoard = board.map(r => r.slice());
    newBoard[row][col] = newValue;
    return newBoard;
};

const moveRowLeft = (row) => {
  const tiles = row.filter(val => val !== 0);
  const newRow = [];
  let score = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (i < tiles.length - 1 && tiles[i] === tiles[i + 1]) {
      const mergedValue = tiles[i] * 2;
      newRow.push(tiles[i] * 2);
      score += mergedValue;
      i++;
    } else {
      newRow.push(tiles[i]);
    }
  }
  while (newRow.length < row.length) {
    newRow.push(0);
  }
  return { newRow, score };
};

const moveLeft = (board) => {
  let totalScore = 0;
  const newBoard = board.map(row => {
    const { newRow, score } = moveRowLeft(row);
    totalScore += score;
    return newRow;
  });
  const moved = JSON.stringify(board) !== JSON.stringify(newBoard);
  return { newBoard, totalScore, moved };
};

const rotateBoard = (board) => {
  const size = board.length;
  const newBoard = Array.from({ length: size }, () => Array(size).fill(0));
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      newBoard[col][size - 1 - row] = board[row][col];
    }
  }
  return newBoard;
};

export const moveTiles = (board, direction) => {
  let rotatedBoard = board;
  let rotations = 0;
  switch (direction) {
    case DIRECTIONS.LEFT:
      rotations = 0;
      break;
    case DIRECTIONS.RIGHT:
      rotations = 2;
      break;
    case DIRECTIONS.UP:
      rotations = 3;
      break;
    case DIRECTIONS.DOWN:
      rotations = 1;
      break;
    default:
      return { newBoard: board, score: 0, moved: false };
  }

  for (let i = 0; i < rotations; i++) {
    rotatedBoard = rotateBoard(rotatedBoard);
  }

  const { newBoard: movedBoard, totalScore, moved } = moveLeft(rotatedBoard);

  let finalBoard = movedBoard;
  for (let i = 0; i < (4 - rotations) % 4; i++) {
    finalBoard = rotateBoard(finalBoard);
  }

  return { newBoard: finalBoard, score: totalScore, moved };
};

export const canMove = (board) => {
  if (getEmptyCells(board).length > 0) return true;

  const size = board.length;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const current = board[row][col];
      const right = col < size - 1 ? board[row][col + 1] : null;
      const down = row < size - 1 ? board[row + 1][col] : null;

      if (current === right || current === down) {
        return true;
      }
    }
  }

  return false;
};

export const hasWon = (board) => {
  return board.some(row => row.some(cell => cell >= 2048));
};
