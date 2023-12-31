import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { userAsync } from '@/store/user'
import { cn } from '@/utils'
import { sliceState } from '@/interface/state'
import Button from '@/components/elements/Button'
import UserInfo from '@/components/modules/UserInfo'

const UserDetail = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const router = useRouter()
  const id = router.query.id as string
  const userData = useSelector((state: sliceState) => state.user?.data)

  useEffect(() => {
    dispatch(userAsync(id))
  }, [dispatch, id, router.query.id])

  const handleToInput = () => {
    router.push(`/users/${id}/edit`)
  }

  return (
    <div {...props} className={cn('mx-auto w-4/5 ', className)} ref={ref}>
      <UserInfo userData={userData} />

      <Button
        theme="primary"
        className="mt-8 w-full"
        onClick={() => handleToInput()}
      >
        Edit User
      </Button>
    </div>
  )
})
UserDetail.displayName = 'UserDetail'

export { UserDetail }
