import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Tile from './Tile'

describe('Tile Component', () => {
  it('should not render anything for value 0', () => {
    render(<Tile value={0} />)
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('should render tile with value', () => {
    render(<Tile value={2} />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should have correct color classes for different values', () => {
    const { container } = render(<Tile value={2} />)
    const tileDiv = container.firstChild
    expect(tileDiv).toHaveClass('bg-blue-100')

    const { container: container4 } = render(<Tile value={4} />)
    expect(container4.firstChild).toHaveClass('bg-blue-200')

    const { container: container8 } = render(<Tile value={8} />)
    expect(container8.firstChild).toHaveClass('bg-blue-300')

    const { container: container2048 } = render(<Tile value={2048} />)
    expect(container2048.firstChild).toHaveClass('bg-indigo-700')
  })

  it('should have correct text color for different values', () => {
    const { container } = render(<Tile value={2} />)
    expect(container.firstChild).toHaveClass('text-gray-700')

    const { container: container8 } = render(<Tile value={8} />)
    expect(container8.firstChild).toHaveClass('text-white')
  })

  it('should have correct font size for different values', () => {
    const { container } = render(<Tile value={2} />)
    expect(container.firstChild).toHaveClass('text-4xl')

    const { container: container128 } = render(<Tile value={128} />)
    expect(container128.firstChild).toHaveClass('text-3xl')

    const { container: container1024 } = render(<Tile value={1024} />)
    expect(container1024.firstChild).toHaveClass('text-2xl')
  })

  it('should have consistent styling classes', () => {
    const { container } = render(<Tile value={16} />)
    const tileDiv = container.firstChild

    expect(tileDiv).toHaveClass('w-20', 'h-20', 'flex', 'items-center', 'justify-center', 'rounded-lg', 'font-bold', 'shadow-md', 'transition-all', 'duration-150')
  })
})
