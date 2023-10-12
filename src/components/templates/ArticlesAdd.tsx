import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import ArticleAdd from '@/components/modules/Articles/ArticleAdd'

export default function ArticlesAdd() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Add Article</h1>
      <ArticleAdd />
    </DefaultLayout>
  )
}
