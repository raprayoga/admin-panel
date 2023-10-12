import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import ArticleList from '@/components/modules/Articles/ArticleList'
import Link from 'next/link'
import Button from '@/components/elements/Button'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Articles() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Article</h1>
      <div className="flex justify-end">
        <Link href="articles/add">
          <Button className="mb-3 px-2 py-1 text-right">
            <PlusIcon className="mr-1 w-4 text-white" />
            Add Article
          </Button>
        </Link>
      </div>
      <ArticleList />
    </DefaultLayout>
  )
}
