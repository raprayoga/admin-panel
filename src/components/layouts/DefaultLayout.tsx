import React from 'react'
import SideBar from '@/components/modules/SideBar'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <SideBar />
      <main className="min-h-screen w-full px-12 pt-5">{children}</main>
    </div>
  )
}
