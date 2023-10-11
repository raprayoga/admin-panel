import React, { useEffect, useRef } from 'react'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { search, usersAsync } from '@/store/users'
import { Input, InputGroup } from '@/components/elements/InputGroup'
import {
  AtSymbolIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/utils'
import Button from '@/components/elements/Button'
import Card from '@/components/elements/Card'

const UsersSearchForm = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const inputName = useRef<HTMLInputElement>(null)
  const inputEmail = useRef<HTMLInputElement>(null)

  useEffect(() => {
    dispatch(usersAsync())
  }, [dispatch])

  const handleSearch = () => {
    const name = inputName.current?.value
    const email = inputEmail.current?.value

    dispatch(
      search({
        form: {
          name: name,
          email: email,
        },
      })
    )
    dispatch(usersAsync())
  }

  return (
    <Card className={cn('', className)} {...props}>
      <div className="flex justify-around gap-1">
        <InputGroup className="w-full">
          <UserCircleIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
          <Input
            ref={inputName}
            type="name"
            placeholder="name"
            className="pl-6"
          />
        </InputGroup>
        <InputGroup className="w-full">
          <AtSymbolIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
          <Input
            ref={inputEmail}
            type="email"
            placeholder="email"
            className="pl-6"
          />
        </InputGroup>
      </div>
      <Button className="mt-3 w-full" onClick={handleSearch}>
        <MagnifyingGlassIcon className="mr-2 w-4" />
        Searcch
      </Button>
    </Card>
  )
})
UsersSearchForm.displayName = 'UsersSearchForm'

export { UsersSearchForm }
