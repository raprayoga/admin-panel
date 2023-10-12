import type { Meta, StoryObj } from '@storybook/react'
import UserInfo from './index'

const meta: Meta<typeof UserInfo> = {
  component: UserInfo,
  args: {
    userData: {
      _id: '648c4a388f6c1f606c750c21',
      name: 'admin',
      email: 'admin@admin.com',
      emailVerifiedAt: '2023-06-16T11:40:40.273Z',
      role: {
        _id: '648c4a358f6c1f606c750c1c',
        name: 'admin',
        permissions: [
          'user:create',
          'user:read',
          'user:update',
          'user:delete',
          'role:create',
          'role:read',
          'role:update',
          'role:delete',
          'category:create',
          'category:update',
          'category:delete',
          'article:create',
          'article:read',
          'article:update',
          'article:delete',
          'article:read_other',
          'article:update_other',
          'article:delete_other',
          'article:restore',
          'article:restore_other',
          'article:delete_forever',
          'article:delete_forever_other',
        ],
      },
      avatar:
        'https://www.ibanez.com/common/product_artist_file/file/a_main_NikitaKamprad.jpg',
      bio: 'admin',
    },
    className: 'w-[500px] mx-auto',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof UserInfo>

export const Default: Story = {}
