import React, { useEffect, useState } from 'react'
import { Dispatch } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { search, articlesAsync } from '@/store/articles'
import { Input, InputGroup } from '@/components/elements/InputGroup'
import {
  AtSymbolIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import Button from '@/components/elements/Button'
import Card from '@/components/elements/Card'
import { sliceState } from '@/interface/state'
import Link from 'next/link'
import Select from '@/components/elements/Select'

const ArticlesSearchForm = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const articleState = useSelector((state: sliceState) => state.articles)

  const handleChange = (e: any) => {
    const tempState = JSON.parse(JSON.stringify(articleState.form))
    const name = e.target.name
    const value = e.target.value
    console.log(value)
    tempState[name] = value
    dispatch(
      search({
        form: tempState,
      })
    )
    console.log(articleState)
  }

  const handleSearch = () => {
    dispatch(articlesAsync())
  }

  return (
    <Card className={className} {...props} ref={ref}>
      <div className="flex justify-end">
        <Link href="articles/add">
          <Button className="mb-3 px-2 py-1 text-right">
            <PlusIcon className="mr-1 w-4 text-white" />
            Add Article
          </Button>
        </Link>
      </div>
      <div className="flex justify-around gap-1">
        <InputGroup className="w-full">
          <UserCircleIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
          <Input
            type="text"
            name="title"
            placeholder="title"
            className="pl-6"
            value={articleState.form.title}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="w-full">
          <AtSymbolIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
          <Select
            className="pl-6"
            name="status"
            onChange={handleChange}
            value={articleState.form.status}
          >
            <option value="">Choose Status</option>
            <option value="PUBLISHED">PUBLISHED</option>
            <option value="PINNED">PINNED</option>
          </Select>
        </InputGroup>
      </div>
      <Button
        className="mt-3 w-full"
        onClick={handleSearch}
        isLoading={articleState.loading}
      >
        <MagnifyingGlassIcon className="mr-2 w-4" />
        Search
      </Button>
    </Card>
  )
})
ArticlesSearchForm.displayName = 'ArticlesSearchForm'

export { ArticlesSearchForm }
