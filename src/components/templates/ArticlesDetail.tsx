import React from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { ArticlesDetail } from '@/components/modules/Articles/ArticlesDetail/ArticlesDetail'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function ArticleDetail() {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }

  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Detail Article</h1>
      <button className="flex items-center text-primary" onClick={handleBack}>
        <ArrowLeftIcon className="w-4 stroke-2" /> Back
      </button>
      <ArticlesDetail />
    </DefaultLayout>
  )
}
