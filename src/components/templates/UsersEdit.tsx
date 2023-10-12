import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import UserEdit from '@/components/modules/Users/UserEdit'

export default function ProfileEdit() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">User Edit</h1>
      <UserEdit />
    </DefaultLayout>
  )
}
