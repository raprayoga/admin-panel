import React from 'react'
import Login from '@/components/templates/Login'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const { status } = useSession()
  const router = useRouter()

  if (status === 'authenticated') {
    router.push('/')
  }
  return <Login />
}
