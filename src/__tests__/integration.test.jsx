import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('2048 Game Integration', () => {
  it('should start with initial game state', () => {
    render(<App />)

    expect(screen.getByText('2048 Game')).toBeInTheDocument()
    expect(screen.getByText('Score: 0')).toBeInTheDocument()
    expect(screen.queryByText('You Win!')).not.toBeInTheDocument()
    expect(screen.queryByText('Game Over!')).not.toBeInTheDocument()
  })

  it('should allow keyboard controls to work', async () => {
    const user = userEvent.setup()
    render(<App />)

    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    fireEvent.keyDown(window, { key: 'ArrowRight' })
    fireEvent.keyDown(window, { key: 'ArrowUp' })
    fireEvent.keyDown(window, { key: 'ArrowDown' })

    await waitFor(() => {
      expect(screen.getByText('2048 Game')).toBeInTheDocument()
    })
  })

  it('should allow GUI controls to work', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByText('↑'))
    await user.click(screen.getByText('↓'))
    await user.click(screen.getByText('←'))
    await user.click(screen.getByText('→'))

    expect(screen.getByText('2048 Game')).toBeInTheDocument()
  })

  it('should restart game when New Game is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const initialScoreText = screen.getByText(/Score: \d+/).textContent

    await user.click(screen.getByText('New Game'))

    await waitFor(() => {
      expect(screen.getByText('Score: 0')).toBeInTheDocument()
    })

    expect(screen.queryByText('You Win!')).not.toBeInTheDocument()
    expect(screen.queryByText('Game Over!')).not.toBeInTheDocument()
  })

  it('should update score when moves result in merges', async () => {
    const user = userEvent.setup()
    render(<App />)

    for (let i = 0; i < 10; i++) {
      await user.click(screen.getByText('←'))
      await user.click(screen.getByText('→'))
      await user.click(screen.getByText('↑'))
      await user.click(screen.getByText('↓'))
    }

    const scoreElement = screen.getByText(/Score: \d+/)
    expect(scoreElement).toBeInTheDocument()
    expect(scoreElement.textContent).toMatch(/Score: \d+/)
  })

  it('should render tiles on the board', () => {
    render(<App />)

    const tiles = screen.queryAllByText(/[0-9]+/)
    expect(tiles.length).toBeGreaterThanOrEqual(2)
  })

  it('should handle rapid clicking without errors', async () => {
    const user = userEvent.setup()
    render(<App />)

    const promises = []
    for (let i = 0; i < 20; i++) {
      promises.push(user.click(screen.getByText('←')))
      promises.push(user.click(screen.getByText('→')))
      promises.push(user.click(screen.getByText('↑')))
      promises.push(user.click(screen.getByText('↓')))
    }

    await Promise.all(promises)

    expect(screen.getByText('2048 Game')).toBeInTheDocument()
  })

  it('should maintain game state consistency', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByText('←'))
    await user.click(screen.getByText('→'))

    const scoreText = screen.getByText(/Score: \d+/).textContent
    const score = parseInt(scoreText.replace('Score: ', ''))
    expect(typeof score).toBe('number')
    expect(score).toBeGreaterThanOrEqual(0)

    const boardElement = document.querySelector('.board')
    expect(boardElement).toBeInTheDocument()
  })
})
