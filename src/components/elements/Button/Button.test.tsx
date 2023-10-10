import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Button from './index'

const caseTheme: {
  theme: 'primary' | 'green'
  variant: 'filled' | 'ghost'
  style: string
}[] = [
  {
    theme: 'primary',
    variant: 'filled',
    style: 'bg-primary text-white hover:opacity-90',
  },
  {
    theme: 'primary',
    variant: 'ghost',
    style:
      'border border-primary text-primary bg-white hover:bg-primary hover:text-white',
  },
  {
    theme: 'green',
    variant: 'filled',
    style: 'bg-green text-white hover:opacity-90',
  },
  {
    theme: 'green',
    variant: 'ghost',
    style:
      'border border-green text-green bg-white hover:bg-green hover:text-white',
  },
]
const text = 'Button'

const setup = (props: React.ComponentProps<typeof Button>) => {
  const utils = render(<Button {...props}>{text}</Button>)

  const buttonElement = screen.getByTestId('button-element')

  return { ...utils, buttonElement }
}

describe('Render Button', () => {
  test.each(caseTheme)(
    'Should render variant correctly',
    ({ theme, variant, style }) => {
      const { buttonElement } = setup({ theme, variant })

      expect(buttonElement).toHaveClass(style)
    }
  )

  test('Sould handle click', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    const { buttonElement } = setup({ onClick: handleClick() })
    await user.click(buttonElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
