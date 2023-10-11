import React from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import { signOut } from 'next-auth/react'

export default function Account() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Account</h1>
      <button onClick={() => signOut()}>LOGOUT</button>
    </DefaultLayout>
  )
}
