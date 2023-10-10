import type { Meta, StoryObj } from '@storybook/react'
import Select from './index'

const meta: Meta<typeof Select> = {
  component: Select,
  args: {
    className: 'w-[500px] text-green',
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['red', 'default', 'green'],
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const TextVariant: Story = {
  render: (args) => (
    <Select {...args}>
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </Select>
  ),
}
