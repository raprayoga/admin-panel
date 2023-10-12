import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import CategoryAdd from '@/components/modules/Categories/CategoryAdd'

export default function CategoriesAdd() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Category</h1>
      <CategoryAdd className="mt-20" />
    </DefaultLayout>
  )
}
