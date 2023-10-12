import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import profilePhoto from '@/assets/images/male-avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { sliceState } from '@/interface/state'
import { articleAsync } from '@/store/article'
import { Dispatch } from '@reduxjs/toolkit'
import Button from '@/components/elements/Button'
import { categoriesAsync } from '@/store/categories'

const ArticlesDetail = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const router = useRouter()
  const id = router.query.id as string
  const articleData = useSelector((state: sliceState) => state.article.data)
  const categories = useSelector((state: sliceState) => state.categories.data)
  const [src, setSrc] = useState<
    string | typeof profilePhoto | null | undefined
  >(articleData?.thumbnail)

  useEffect(() => {
    dispatch(articleAsync(id))
    dispatch(categoriesAsync())
  }, [dispatch, id, router.query.id])

  return (
    <div className={className} {...props} ref={ref}>
      <div className="mb-10 flex flex-col items-center justify-center text-center">
        <div className="relative">
          <Image
            src={src || ''}
            alt="thumbnail"
            width={125}
            height={125}
            className="h-[125px] w-[125px] rounded-full"
            onError={() => setSrc(profilePhoto)}
          />
        </div>
        <h2 className="mb-3 ml-1 mt-5 text-center text-3xl font-semibold">
          {articleData?.title}
        </h2>
      </div>

      <div>
        <table className="mx-auto w-2/3 text-left text-sm">
          <tbody>
            <tr className="border-b border-b-gray-shadow bg-white">
              <td className="px-6 py-4">status</td>
              <td className="border-l border-l-gray-shadow px-6 py-4">
                {articleData?.status}
              </td>
            </tr>
            <tr className="border-b border-b-gray-shadow bg-white">
              <td className="px-6 py-4">categories</td>
              <td className="border-l border-l-gray-shadow px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {categories.map(
                    (category) =>
                      articleData?.categories.includes(category._id) && (
                        <Button
                          variant="ghost"
                          key={category._id}
                          className="px-2 py-1 text-xs lg:text-xs"
                          disabled
                        >
                          {category.name}
                        </Button>
                      )
                  )}
                </div>
              </td>
            </tr>
            <tr className="border-b border-b-gray-shadow bg-white">
              <td className="px-6 py-4">Descriptionn</td>
              <td className="border-l border-l-gray-shadow px-6 py-4">
                {articleData?.description}
              </td>
            </tr>
            <tr className="border-b border-b-gray-shadow bg-white">
              <td className="px-6 py-4">Author</td>
              <td className="flex flex-col items-center border-l border-l-gray-shadow px-6 py-4">
                <Image
                  src={articleData?.author.avatar || ''}
                  alt="author"
                  width={75}
                  height={75}
                  className="h-[75px] w-[75px] rounded-full"
                />
                {articleData?.author.name}
              </td>
            </tr>
            {articleData && articleData.content && (
              <tr className="border-b border-b-gray-shadow bg-white p-2">
                <td className="px-6 py-4" colSpan={2}>
                  <div
                    dangerouslySetInnerHTML={{ __html: articleData?.content }}
                    className="my-10 text-sm"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
})
ArticlesDetail.displayName = 'ArticlesDetail'

export { ArticlesDetail }
