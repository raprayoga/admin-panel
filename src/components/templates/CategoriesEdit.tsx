import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import CategoryEdit from '@/components/modules/Categories/CategoryEdit'

export default function CategoriesEdit() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Edit Category</h1>
      <CategoryEdit className="mt-20" />
    </DefaultLayout>
  )
}
