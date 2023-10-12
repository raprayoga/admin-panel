import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import Link from 'next/link'
import Button from '@/components/elements/Button'
import { PlusIcon } from '@heroicons/react/24/outline'
import CategoryList from '@/components/modules/Categories'

export default function Categories() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Category</h1>
      <div className="flex justify-end">
        <Link href="categories/add">
          <Button className="mb-3 px-2 py-1 text-right">
            <PlusIcon className="mr-1 w-4 text-white" />
            Add Category
          </Button>
        </Link>
      </div>
      <CategoryList />
    </DefaultLayout>
  )
}
