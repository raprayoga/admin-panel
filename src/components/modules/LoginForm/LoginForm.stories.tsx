import type { Meta, StoryObj } from '@storybook/react'
import LoginForm from './index'

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  args: {
    className: 'w-[500px] text-green',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const TextVariant: Story = {
  render: (args) => <LoginForm {...args} className="w-full" />,
}
