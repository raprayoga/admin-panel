import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input, InputGroup } from './index'
import { HomeIcon } from '@heroicons/react/24/outline'

const placeholder = 'input name'
const inputText = 'inputed text'

const variants: { theme: 'default' | 'red' | 'green'; style: string }[] = [
  { theme: 'default', style: 'border-gray focus:shadow-gray' },
  { theme: 'red', style: 'border-red focus:shadow-red' },
  { theme: 'green', style: 'border-green focus:shadow-green' },
]

const setup = (props: React.ComponentProps<typeof Input>) => {
  const utils = render(
    <InputGroup>
      <HomeIcon />
      <Input placeholder={placeholder} {...props} />
    </InputGroup>
  )

  const inputElement = screen.getByTestId('input-element')

  return { ...utils, inputElement }
}

describe('Input test', () => {
  test.each(variants)('Should render variant correctly', ({ theme, style }) => {
    const { inputElement } = setup({ placeholder, theme })

    expect(inputElement).toHaveClass(style)
  })

  test('sould handle input user', () => {
    const { inputElement } = setup({})

    fireEvent.change(inputElement, {
      target: {
        value: inputText,
      },
    })
    expect(inputElement).toHaveValue(inputText)
  })
})
