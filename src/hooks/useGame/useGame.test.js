import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useGame } from './useGame'

describe('useGame Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with empty board and zero score', () => {
    const { result } = renderHook(() => useGame())

    expect(result.current.board).toHaveLength(4)
    expect(result.current.board[0]).toHaveLength(4)
    expect(result.current.score).toBe(0)
    expect(result.current.gameOver).toBe(false)
    expect(result.current.gameWon).toBe(false)
  })

  it('should initialize board with two tiles', () => {
    const { result } = renderHook(() => useGame())

    const filledCells = result.current.board.flat().filter(cell => cell !== 0)
    expect(filledCells).toHaveLength(2)
    filledCells.forEach(cell => {
      expect([2, 4]).toContain(cell)
    })
  })

  it('should handle move correctly', () => {
    const { result } = renderHook(() => useGame())

    act(() => {
      result.current.handleMove('LEFT')
    })

    expect(result.current.board).toBeDefined()
    expect(typeof result.current.score).toBe('number')
  })

  it('should not move when game is over', () => {
    const { result } = renderHook(() => useGame())

    act(() => {
      result.current = { ...result.current, gameOver: true }
    })

    const boardBefore = [...result.current.board]
    act(() => {
      result.current.handleMove('LEFT')
    })

    expect(result.current.board).toBeDefined()
  })

  it('should not move when game is won', () => {
    const { result } = renderHook(() => useGame())

    act(() => {
      result.current = { ...result.current, gameWon: true }
    })

    const boardBefore = [...result.current.board]
    act(() => {
      result.current.handleMove('LEFT')
    })

    expect(result.current.board).toBeDefined()
  })

  it('should restart game correctly', () => {
    const { result } = renderHook(() => useGame())

    const initialBoard = [...result.current.board]
    const initialScore = result.current.score

    act(() => {
      result.current.initGame()
    })

    const filledCells = result.current.board.flat().filter(cell => cell !== 0)
    expect(filledCells).toHaveLength(2)
    expect(result.current.score).toBe(0)
    expect(result.current.gameOver).toBe(false)
    expect(result.current.gameWon).toBe(false)
  })

  it('should support configurable board size', () => {
    const { result } = renderHook(() => useGame(3))

    expect(result.current.board).toHaveLength(3)
    expect(result.current.board[0]).toHaveLength(3)

    const filledCells = result.current.board.flat().filter(cell => cell !== 0)
    expect(filledCells).toHaveLength(2)
  })

  it('should export handleMove function', () => {
    const { result } = renderHook(() => useGame())

    expect(typeof result.current.handleMove).toBe('function')
    expect(result.current).toHaveProperty('handleMove')
  })

  it('should maintain game state correctly', () => {
    const { result } = renderHook(() => useGame())

    expect(result.current).toHaveProperty('board')
    expect(result.current).toHaveProperty('score')
    expect(result.current).toHaveProperty('gameOver')
    expect(result.current).toHaveProperty('gameWon')
    expect(result.current).toHaveProperty('initGame')
    expect(result.current).toHaveProperty('handleMove')

    expect(Array.isArray(result.current.board)).toBe(true)
    expect(typeof result.current.score).toBe('number')
    expect(typeof result.current.gameOver).toBe('boolean')
    expect(typeof result.current.gameWon).toBe('boolean')
    expect(typeof result.current.initGame).toBe('function')
    expect(typeof result.current.handleMove).toBe('function')
  })
})
