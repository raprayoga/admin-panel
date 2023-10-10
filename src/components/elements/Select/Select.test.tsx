import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Select from './index'

const variants: { theme: 'default' | 'red' | 'green'; style: string }[] = [
  { theme: 'default', style: 'border-gray focus:shadow-primary' },
  { theme: 'red', style: 'border-red focus:shadow-red' },
  { theme: 'green', style: 'border-green focus:shadow-green' },
]

const setup = (props: React.ComponentProps<typeof Select>) => {
  const utils = render(
    <Select {...props}>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
    </Select>
  )

  const selectElement = screen.getByTestId('select-element')

  return { ...utils, selectElement }
}

describe('select test', () => {
  test.each(variants)('Should render variant correctly', ({ theme, style }) => {
    const { selectElement } = setup({ theme })

    expect(selectElement).toHaveClass(style)
  })

  test('sould handle select user', async () => {
    const user = userEvent.setup()
    const { selectElement } = setup({})

    await user.click(selectElement)
    await user.click(screen.getByText(1))
    expect(selectElement).toHaveValue('1')
  })
})
