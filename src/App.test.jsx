import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Component', () => {
  it('should render the main game elements', () => {
    render(<App />)

    expect(screen.getByText('2048 Game')).toBeInTheDocument()
    expect(screen.getByText(/Score:/)).toBeInTheDocument()
    expect(screen.getByText('New Game')).toBeInTheDocument()
  })

  it('should render move control buttons', () => {
    render(<App />)

    expect(screen.getByText('↑')).toBeInTheDocument()
    expect(screen.getByText('↓')).toBeInTheDocument()
    expect(screen.getByText('←')).toBeInTheDocument()
    expect(screen.getByText('→')).toBeInTheDocument()
  })

  it('should display initial score of 0', () => {
    render(<App />)

    expect(screen.getByText('Score: 0')).toBeInTheDocument()
  })

  it('should have correct app container styling', () => {
    const { container } = render(<App />)
    const appDiv = container.firstChild

    expect(appDiv).toHaveClass('app')
  })

  it('should render Board component', () => {
    const { container } = render(<App />)
    const boardElement = container.querySelector('.board')
    expect(boardElement).toBeInTheDocument()
  })

  it('should render GameControls component', () => {
    render(<App />)
    expect(screen.getByText('New Game')).toBeInTheDocument()
    expect(screen.getAllByText(/[↑↓←→]/)).toHaveLength(4)
  })

  it('should allow restarting the game', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByText('New Game'))
    expect(screen.getByText('2048 Game')).toBeInTheDocument()
  })

  it('should handle move button clicks', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByText('↑'))
    await user.click(screen.getByText('↓'))
    await user.click(screen.getByText('←'))
    await user.click(screen.getByText('→'))
    expect(screen.getByText('2048 Game')).toBeInTheDocument()
  })

  it('should not show win or game over messages initially', () => {
    render(<App />)
    expect(screen.queryByText('You Win!')).not.toBeInTheDocument()
    expect(screen.queryByText('Game Over!')).not.toBeInTheDocument()
  })
})
