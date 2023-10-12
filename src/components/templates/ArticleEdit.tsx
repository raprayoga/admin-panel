import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import ArticleEdit from '@/components/modules/Articles/ArticleEdit'

export default function ArticlesEdit() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Edit Article</h1>
      <ArticleEdit />
    </DefaultLayout>
  )
}
