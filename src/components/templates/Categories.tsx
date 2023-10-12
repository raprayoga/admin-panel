import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import CategoryList from '@/components/modules/Categories/CategoryList'
import CategorySearchForm from '@/components/modules/Categories/CategorySearchForm'

export default function Categories() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Category</h1>
      <CategorySearchForm className="mb-10" />
      <CategoryList />
    </DefaultLayout>
  )
}
