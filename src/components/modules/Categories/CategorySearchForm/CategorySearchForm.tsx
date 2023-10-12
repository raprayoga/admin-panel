import React from 'react'
import Link from 'next/link'
import { Dispatch } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { search, categoriesAsync } from '@/store/categories'
import { sliceState } from '@/interface/state'
import { Input, InputGroup } from '@/components/elements/InputGroup'
import Button from '@/components/elements/Button'
import Card from '@/components/elements/Card'
import {
  CodeBracketIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'

const CategorySearchForm = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const categoriesState = useSelector((state: sliceState) => state.categories)

  const handleChange = (e: any) => {
    const tempState = JSON.parse(JSON.stringify(categoriesState.form))
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
    dispatch(categoriesAsync())
  }

  return (
    <Card className={className} {...props} ref={ref}>
      <div className="flex justify-end">
        <Link href="category/add">
          <Button className="mb-3 px-2 py-1 text-right">
            <PlusIcon className="mr-1 w-4 text-white" />
            Add Category
          </Button>
        </Link>
      </div>
      <div className="flex justify-around gap-1">
        <InputGroup className="w-full">
          <PencilSquareIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
          <Input
            type="text"
            name="name"
            placeholder="name"
            className="pl-6"
            value={categoriesState.form.name}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="w-full">
          <CodeBracketIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
          <Input
            type="text"
            name="slug"
            placeholder="slug"
            className="pl-6"
            value={categoriesState.form.slug}
            onChange={handleChange}
          />
        </InputGroup>
      </div>
      <Button
        className="mt-3 w-full"
        onClick={handleSearch}
        isLoading={categoriesState.loading}
      >
        <MagnifyingGlassIcon className="mr-2 w-4" />
        Search
      </Button>
    </Card>
  )
})
CategorySearchForm.displayName = 'CategorySearchForm'

export { CategorySearchForm }
