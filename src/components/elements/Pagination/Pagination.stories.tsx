import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  args: {
    currentPage: 1,
    lastPage: 5,
    pageRangeDisplayed: 3,
    className: 'mt-10 ml-10',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {}
