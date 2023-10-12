import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import UserDetail from '@/components/modules/Users/UserDetail'
import { useRouter } from 'next/router'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function UsersDetail() {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }

  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Detail User</h1>
      <button className="flex items-center text-primary" onClick={handleBack}>
        <ArrowLeftIcon className="w-4 stroke-2" /> Back
      </button>
      <UserDetail />
    </DefaultLayout>
  )
}
