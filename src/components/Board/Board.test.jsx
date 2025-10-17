import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Board from './Board'

describe('Board Component', () => {
  it('should render 4x4 grid for 4x4 board', () => {
    const board = [
      [2, 4, 0, 0],
      [0, 8, 0, 0],
      [0, 0, 16, 0],
      [0, 0, 0, 32]
    ]
    render(<Board board={board} />)

    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('16')).toBeInTheDocument()
    expect(screen.getByText('32')).toBeInTheDocument()

    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('should render empty board correctly', () => {
    const board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
    render(<Board board={board} />)

    expect(screen.queryByText(/[0-9]+/)).not.toBeInTheDocument()
  })

  it('should render board with all tiles filled', () => {
    const board = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2048, 4096],
      [8192, 16384, 32768, 65536]
    ]
    render(<Board board={board} />)

    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('2048')).toBeInTheDocument()
    expect(screen.getByText('65536')).toBeInTheDocument()
  })

  it('should have correct board styling', () => {
    const board = [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
    const { container } = render(<Board board={board} />)

    const boardElement = container.firstChild
    expect(boardElement).toHaveClass('board')
  })
})
