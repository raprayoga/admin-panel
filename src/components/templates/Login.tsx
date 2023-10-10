import React from 'react'
import Card from '@/components/elements/Card'
import LoginForm from '@/components/modules/LoginForm'

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="h-full w-full px-10 py-10 md:h-fit md:w-2/3 lg:max-w-[700px] lg:px-40">
        <LoginForm />
      </Card>
    </div>
  )
}
