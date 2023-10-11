import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import UserDetail from '@/components/modules/Users/UserDetail'

export default function UsersDetail() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Detail User</h1>
      <UserDetail />
    </DefaultLayout>
  )
}
