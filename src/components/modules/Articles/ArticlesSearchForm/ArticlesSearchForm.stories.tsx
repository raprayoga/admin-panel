import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ArticlesSearchForm from './index'

const meta: Meta<typeof ArticlesSearchForm> = {
  component: ArticlesSearchForm,
  args: {
    className: 'w-[500px] text-green',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <ArticlesSearchForm {...args} className="w-full" />,
}
