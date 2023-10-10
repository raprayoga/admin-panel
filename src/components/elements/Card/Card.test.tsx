import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Card from './index'

const variants: { theme: 'red' | 'white' | 'green'; style: string }[] = [
  { theme: 'red', style: 'bg-red shadow shadow-red text-white' },
  { theme: 'white', style: 'bg-white border border-gray' },
  { theme: 'green', style: 'bg-green shadow shadow-green text-white' },
]

describe('Card correctly', () => {
  test.each(variants)('sould render card correctly ', ({ theme, style }) => {
    render(
      <Card className={style} theme={theme}>
        Card
      </Card>
    )

    const cardElement = screen.getByTestId('card-element')
    expect(cardElement).toHaveClass(style)
  })
})
