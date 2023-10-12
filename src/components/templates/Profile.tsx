import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import ProfileUser from '@/components/modules/Profile/ProfileUser'

export default function Profile() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Profile</h1>
      <ProfileUser />
    </DefaultLayout>
  )
}
