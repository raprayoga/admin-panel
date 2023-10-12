import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import RoleEdit from '@/components/modules/Roles/RoleEdit'

export default function RolesEdit() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Edit Role</h1>
      <div className="mt-[100px] flex">
        <RoleEdit />
      </div>
    </DefaultLayout>
  )
}
