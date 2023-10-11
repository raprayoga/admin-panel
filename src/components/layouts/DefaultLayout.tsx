import React from 'react'
import SideBar from '@/components/modules/SideBar'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <SideBar className="fixed w-1/5" />
      <div className="w-1/5" />
      <main className="mb-20 ml-2.5 min-h-screen w-4/5 px-8 pt-5">
        {children}
      </main>
    </div>
  )
}
