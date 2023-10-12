import React, { useState } from 'react'
import Image from 'next/image'
import { DataResponse } from '@/interface/profile'
import Card from '@/components/elements/Card'
import { Input, InputGroup } from '@/components/elements/InputGroup'
import Button from '@/components/elements/Button'
import {
  AtSymbolIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import profilePhoto from '@/assets/images/male-avatar.png'

interface UserInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  userData: null | DataResponse
}

const UserInfo = React.forwardRef<HTMLDivElement, UserInfoProps>(
  ({ userData, className, ...props }, ref) => {
    const [src, setSrc] = useState<
      string | typeof profilePhoto | null | undefined
    >(userData?.avatar)

    return (
      <div className={className} {...props} ref={ref}>
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
            <Input
              name="name"
              className="pl-6"
              value={userData?.name}
              readOnly
            />
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
              <Button
                variant="ghost"
                key={permission}
                className="px-3 py-1"
                disabled
              >
                {permission}
              </Button>
            ))}
          </Card>
        </div>
      </div>
    )
  }
)
UserInfo.displayName = 'UserInfo'

export { UserInfo }
