import { useState, useEffect, useCallback } from 'react';
import { initializeBoard, addRandomTile, moveTiles, canMove, hasWon } from '../utils/gameLogic';
import { DIRECTIONS, INITIAL_TILES } from '../utils/constants';

export const useGame = (boardSize = 4) => {
    const [board, setBoard] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    const initGame = useCallback(() => {
        let newBoard = initializeBoard(boardSize);

        for (let i = 0; i < INITIAL_TILES; i++) {
            newBoard = addRandomTile(newBoard);
        }

        setBoard(newBoard);
        setScore(0);
        setGameOver(false);
        setGameWon(false);
    }, [boardSize]);

    useEffect(() => {
        initGame();
    }, [initGame]);

    const handleMove = useCallback((direction) => {
        if (gameOver || gameWon) return;
        const { newBoard, score: moveScore, moved } = moveTiles(board, direction);

        if (!moved) return;

        const boardWithNewTile = addRandomTile(newBoard);

        setBoard(boardWithNewTile);
        setScore(prevScore => prevScore + moveScore);

        if (hasWon(boardWithNewTile) && !gameWon) {
            setGameWon(true);
        }

        if (!canMove(boardWithNewTile)) {
            setGameOver(true);
        }
    }, [board, gameOver, gameWon]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }

            switch (e.key) {
                case 'ArrowUp':
                handleMove(DIRECTIONS.UP);
                break;
                case 'ArrowDown':
                handleMove(DIRECTIONS.DOWN);
                break;
                case 'ArrowLeft':
                handleMove(DIRECTIONS.LEFT);
                break;
                case 'ArrowRight':
                handleMove(DIRECTIONS.RIGHT);
                break;
                default:
                break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
        window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleMove]);

    return { board, score, gameOver, gameWon, initGame, handleMove };
};