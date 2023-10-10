import type { Meta } from '@storybook/react'
import SideBar from './index'

const meta: Meta<typeof SideBar> = {
  component: SideBar,
  tags: ['autodocs'],
}

export default meta

export const Default = () => {
  return <SideBar />
}
