import React from 'react'
import Link from 'next/link'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import RoleList from '@/components/modules/Roles/RoleList'
import Button from '@/components/elements/Button'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Roles() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Roles</h1>
      <div className="flex justify-end">
        <Link href="roles/add">
          <Button className="mb-3 px-2 py-1 text-right">
            <PlusIcon className="mr-1 w-4 text-white" />
            Add Roles
          </Button>
        </Link>
      </div>
      <RoleList />
    </DefaultLayout>
  )
}
