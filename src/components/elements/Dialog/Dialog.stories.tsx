import type { Meta, StoryObj } from '@storybook/react'
import Dialog from './index'

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  args: {
    className: 'w-[500px] text-green',
  },
  argTypes: {
    isShow: { control: 'select', options: [true, false] },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {}
