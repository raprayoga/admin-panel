import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import RoleAdd from '@/components/modules/Roles/RoleAdd'

export default function RolesAdd() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Add Role</h1>
      <div className="mt-[100px] flex">
        <RoleAdd />
      </div>
    </DefaultLayout>
  )
}
