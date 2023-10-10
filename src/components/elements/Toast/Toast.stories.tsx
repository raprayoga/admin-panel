import type { Meta, StoryObj } from '@storybook/react'
import Toast from './index'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof Toast> = {
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  args: {
    theme: 'red',
    isShow: true,
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Toast>

export const Default: Story = {
  render: (args) => {
    return (
      <Toast {...args} onCLosed={action('onCLosed!')}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quaerat
        </p>
      </Toast>
    )
  },
}
