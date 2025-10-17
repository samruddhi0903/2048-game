import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GameControls from './GameControls'

describe('GameControls Component', () => {
  const defaultProps = {
    onRestart: vi.fn(),
    gameOver: false,
    gameWon: false,
    onMove: vi.fn()
  }

  it('should render restart button', () => {
    render(<GameControls {...defaultProps} />)
    expect(screen.getByText('New Game')).toBeInTheDocument()
  })

  it('should render move control buttons', () => {
    render(<GameControls {...defaultProps} />)
    expect(screen.getByText('↑')).toBeInTheDocument()
    expect(screen.getByText('↓')).toBeInTheDocument()
    expect(screen.getByText('←')).toBeInTheDocument()
    expect(screen.getByText('→')).toBeInTheDocument()
  })

  it('should call onRestart when New Game button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnRestart = vi.fn()
    render(<GameControls {...defaultProps} onRestart={mockOnRestart} />)

    await user.click(screen.getByText('New Game'))
    expect(mockOnRestart).toHaveBeenCalledTimes(1)
  })

  it('should call onMove with correct direction when arrow buttons are clicked', async () => {
    const user = userEvent.setup()
    const mockOnMove = vi.fn()
    render(<GameControls {...defaultProps} onMove={mockOnMove} />)

    await user.click(screen.getByText('↑'))
    expect(mockOnMove).toHaveBeenCalledWith('UP')

    await user.click(screen.getByText('↓'))
    expect(mockOnMove).toHaveBeenCalledWith('DOWN')

    await user.click(screen.getByText('←'))
    expect(mockOnMove).toHaveBeenCalledWith('LEFT')

    await user.click(screen.getByText('→'))
    expect(mockOnMove).toHaveBeenCalledWith('RIGHT')
  })

  it('should show "You Win!" message when gameWon is true', () => {
    render(<GameControls {...defaultProps} gameWon={true} />)
    expect(screen.getByText('You Win!')).toBeInTheDocument()
  })

  it('should show "Game Over!" message when gameOver is true and gameWon is false', () => {
    render(<GameControls {...defaultProps} gameOver={true} gameWon={false} />)
    expect(screen.getByText('Game Over!')).toBeInTheDocument()
  })

  it('should not show game over message when gameWon is true', () => {
    render(<GameControls {...defaultProps} gameOver={true} gameWon={true} />)
    expect(screen.queryByText('Game Over!')).not.toBeInTheDocument()
    expect(screen.getByText('You Win!')).toBeInTheDocument()
  })

  it('should not show any game status message when game is ongoing', () => {
    render(<GameControls {...defaultProps} />)
    expect(screen.queryByText('You Win!')).not.toBeInTheDocument()
    expect(screen.queryByText('Game Over!')).not.toBeInTheDocument()
  })

  it('should have correct button styling classes', () => {
    render(<GameControls {...defaultProps} />)
    const moveButtons = screen.getAllByText(/[↑↓←→]/)
    moveButtons.forEach(button => {
      expect(button).toHaveClass('move-button')
    })

    const restartButton = screen.getByText('New Game')
    expect(restartButton).toHaveClass('restart-button')
  })
})
