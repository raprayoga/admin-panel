import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import profilePhoto from '@/assets/images/male-avatar.png'
import Card from '@/components/elements/Card'
import {
  AtSymbolIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { Input, InputGroup } from '@/components/elements/InputGroup'
import Button from '@/components/elements/Button'
import { sliceState } from '@/interface/state'
import { useSelector, useDispatch } from 'react-redux'
import { cn } from '@/utils'
import { userAsync } from '@/store/user'
import { Dispatch } from '@reduxjs/toolkit'

const UserDetail = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const router = useRouter()
  const userData = useSelector((state: sliceState) => state.user?.data)
  const [src, setSrc] = useState<
    string | typeof profilePhoto | null | undefined
  >(userData?.avatar)

  useEffect(() => {
    const id = router.query.id as string
    if (router.query.id) dispatch(userAsync(id))
  }, [dispatch, router.query.id])

  return (
    <div {...props} className={cn('mx-auto w-4/5 ', className)} ref={ref}>
      <div className="mb-10 flex flex-col items-center justify-center text-center">
        <div className="relative">
          <Image
            src={src || ''}
            alt="logo"
            width={125}
            height={125}
            className="h-[125px] w-[125px] rounded-full"
            onError={() => setSrc(profilePhoto)}
          />
        </div>
        <h2 className="mb-3 ml-1 mt-5 text-center text-3xl font-semibold">
          {userData?.name}
        </h2>
        <q>{userData?.bio}</q>
      </div>

      <div>
        <label className="">Name</label>
        <InputGroup className="mb-4 w-full">
          <UserIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
          <Input name="name" className="pl-6" value={userData?.name} readOnly />
        </InputGroup>

        <label className="">Email</label>
        <InputGroup className="mb-4 w-full">
          <AtSymbolIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
          <Input
            name="email"
            className="pl-6"
            value={userData?.email}
            readOnly
          />
        </InputGroup>

        <label className="">Role</label>
        <InputGroup className="mb-4 w-full">
          <WrenchScrewdriverIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
          <Input
            name="role"
            className="pl-6"
            value={userData?.role.name}
            readOnly
          />
        </InputGroup>

        <label className="">Permission</label>
        <Card className="flex flex-wrap gap-1">
          {userData?.role.permissions.map((permission) => (
            <Button variant="ghost" key={permission}>
              {permission}
            </Button>
          ))}
        </Card>

        <Button theme="primary" className="mt-8 w-full" onClick={() => {}}>
          Edit Profile
        </Button>
      </div>
    </div>
  )
})
UserDetail.displayName = 'UserDetail'

export { UserDetail }
