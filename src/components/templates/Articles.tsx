import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import ArticleList from '@/components/modules/Articles/ArticleList'
import ArticlesSearchForm from '@/components/modules/Articles/ArticlesSearchForm'

export default function Articles() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Article</h1>
      <ArticlesSearchForm className="mb-10" />
      <ArticleList />
    </DefaultLayout>
  )
}
