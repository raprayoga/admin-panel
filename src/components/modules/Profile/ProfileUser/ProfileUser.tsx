import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { profileAsync } from '@/store/profile'
import { cn } from '@/utils'
import { sliceState } from '@/interface/state'
import Button from '@/components/elements/Button'
import UserInfo from '@/components/modules/UserInfo'

const ProfileUser = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const router = useRouter()
  const userData = useSelector((state: sliceState) => state.profile?.data)
  const [isLoadingLogout, setIsLoadingLogout] = useState(false)

  useEffect(() => {
    dispatch(profileAsync())
  }, [dispatch, router.query.id])

  const handleLogout = () => {
    setIsLoadingLogout(true)
    signOut()
    router.push('/auth/login')
  }

  return (
    <div {...props} className={cn('mx-auto w-4/5 ', className)} ref={ref}>
      <UserInfo userData={userData} />

      <Button
        theme="red"
        variant="ghost"
        className="mt-8 w-full"
        isLoading={isLoadingLogout}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  )
})
ProfileUser.displayName = 'ProfileUser'

export { ProfileUser }
