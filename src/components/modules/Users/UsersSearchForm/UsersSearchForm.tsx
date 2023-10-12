import React, { useEffect, useState } from 'react'
import { Dispatch } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { search, usersAsync } from '@/store/users'
import { Input, InputGroup } from '@/components/elements/InputGroup'
import {
  AtSymbolIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/utils'
import Button from '@/components/elements/Button'
import Card from '@/components/elements/Card'
import { sliceState } from '@/interface/state'
import Link from 'next/link'

const UsersSearchForm = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const userState = useSelector((state: sliceState) => state.users)

  useEffect(() => {
    dispatch(usersAsync())
  }, [dispatch])

  const handleChange = (e: any) => {
    const tempState = JSON.parse(JSON.stringify(userState.form))
    const name = e.target.name
    const value = e.target.value
    tempState[name] = value
    dispatch(
      search({
        form: tempState,
      })
    )
  }

  const handleSearch = () => {
    dispatch(usersAsync())
  }

  return (
    <Card className={cn('', className)} {...props} ref={ref}>
      <div className="flex justify-end">
        <Link href="users/add">
          <Button className="mb-3 px-2 py-1 text-right">
            <PlusIcon className="mr-1 w-4 text-white" />
            Add User
          </Button>
        </Link>
      </div>
      <div className="flex justify-around gap-1">
        <InputGroup className="w-full">
          <UserCircleIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
          <Input
            type="name"
            name="name"
            placeholder="name"
            className="pl-6"
            value={userState.form.name}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="w-full">
          <AtSymbolIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
          <Input
            type="email"
            name="email"
            placeholder="email"
            className="pl-6"
            value={userState.form.email}
            onChange={handleChange}
          />
        </InputGroup>
      </div>
      <Button
        className="mt-3 w-full"
        onClick={handleSearch}
        isLoading={userState.loading}
      >
        <MagnifyingGlassIcon className="mr-2 w-4" />
        Search
      </Button>
    </Card>
  )
})
UsersSearchForm.displayName = 'UsersSearchForm'

export { UsersSearchForm }
