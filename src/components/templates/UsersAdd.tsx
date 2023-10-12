import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import UserAdd from '../modules/Users/UserAdd'

export default function UsersAdd() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Add User</h1>
      <div className="mt-[100px] flex">
        <UserAdd />
      </div>
    </DefaultLayout>
  )
}
