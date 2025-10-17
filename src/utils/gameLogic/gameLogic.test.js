import { describe, it, expect, beforeEach } from 'vitest'
import {
  initializeBoard,
  getEmptyCells,
  addRandomTile,
  moveTiles,
  canMove,
  hasWon
} from './gameLogic'
import { DIRECTIONS } from '../constants'

describe('Game Logic', () => {
  describe('initializeBoard', () => {
    it('should create a 4x4 board filled with zeros', () => {
      const board = initializeBoard(4)
      expect(board).toHaveLength(4)
      expect(board[0]).toHaveLength(4)
      expect(board.flat()).toEqual(new Array(16).fill(0))
    })

    it('should create boards of different sizes', () => {
      const board3x3 = initializeBoard(3)
      expect(board3x3).toHaveLength(3)
      expect(board3x3[0]).toHaveLength(3)

      const board5x5 = initializeBoard(5)
      expect(board5x5).toHaveLength(5)
      expect(board5x5[0]).toHaveLength(5)
    })
  })

  describe('getEmptyCells', () => {
    it('should return all cells for empty board', () => {
      const board = initializeBoard(4)
      const emptyCells = getEmptyCells(board)
      expect(emptyCells).toHaveLength(16)
    })

    it('should return empty cells only', () => {
      const board = [
        [2, 0, 0, 0],
        [0, 4, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
      const emptyCells = getEmptyCells(board)
      expect(emptyCells).toHaveLength(14)
      expect(emptyCells.some(cell => cell.row === 0 && cell.col === 0)).toBe(false)
      expect(emptyCells.some(cell => cell.row === 1 && cell.col === 1)).toBe(false)
    })
  })

  describe('addRandomTile', () => {
    it('should add a tile to empty board', () => {
      const board = initializeBoard(4)
      const newBoard = addRandomTile(board)
      const filledCells = newBoard.flat().filter(cell => cell !== 0)
      expect(filledCells).toHaveLength(1)
      expect([2, 4]).toContain(filledCells[0])
    })

    it('should not add tile to full board', () => {
      const board = [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2]
      ]
      const newBoard = addRandomTile(board)
      expect(newBoard).toEqual(board)
    })
  })

  describe('moveTiles', () => {
    it('should move tiles left correctly', () => {
      const board = [
        [0, 0, 2, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
      const { newBoard, score, moved } = moveTiles(board, DIRECTIONS.LEFT)
      expect(newBoard[0]).toEqual([4, 0, 0, 0])
      expect(score).toBe(4)
      expect(moved).toBe(true)
    })

    it('should merge tiles correctly', () => {
      const board = [
        [2, 2, 4, 4],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
      const { newBoard, score, moved } = moveTiles(board, DIRECTIONS.LEFT)
      expect(newBoard[0]).toEqual([4, 8, 0, 0])
      expect(score).toBe(12)
      expect(moved).toBe(true)
    })

    it('should not move when no valid moves', () => {
      const board = [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2]
      ]
      const { newBoard, score, moved } = moveTiles(board, DIRECTIONS.LEFT)
      expect(newBoard).toEqual(board)
      expect(score).toBe(0)
      expect(moved).toBe(false)
    })

    it('should handle all directions', () => {
      const board = [
        [0, 0, 0, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]

      const { newBoard: rightBoard } = moveTiles(board, DIRECTIONS.RIGHT)
      expect(rightBoard[0][3]).toBe(2)

      const { newBoard: upBoard } = moveTiles(board, DIRECTIONS.UP)
      expect(upBoard[0][3]).toBe(2)

      const { newBoard: downBoard } = moveTiles(board, DIRECTIONS.DOWN)
      expect(downBoard[3][3]).toBe(2)
    })
  })

  describe('canMove', () => {
    it('should return true for empty board', () => {
      const board = initializeBoard(4)
      expect(canMove(board)).toBe(true)
    })

    it('should return true when tiles can merge horizontally', () => {
      const board = [
        [2, 2, 4, 8],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
      expect(canMove(board)).toBe(true)
    })

    it('should return true when tiles can merge vertically', () => {
      const board = [
        [2, 0, 0, 0],
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
      expect(canMove(board)).toBe(true)
    })

    it('should return false when no moves possible', () => {
      const board = [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2]
      ]
      expect(canMove(board)).toBe(false)
    })
  })

  describe('hasWon', () => {
    it('should return false for board without 2048', () => {
      const board = [
        [2, 4, 8, 16],
        [32, 64, 128, 256],
        [512, 1024, 0, 0],
        [0, 0, 0, 0]
      ]
      expect(hasWon(board)).toBe(false)
    })

    it('should return true for board with 2048', () => {
      const board = [
        [2, 4, 8, 16],
        [32, 64, 128, 256],
        [512, 1024, 2048, 0],
        [0, 0, 0, 0]
      ]
      expect(hasWon(board)).toBe(true)
    })
  })
})
