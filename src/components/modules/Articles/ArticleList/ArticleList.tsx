import React, { useState, useEffect } from 'react'
import Button from '@/components/elements/Button'
import Dialog from '@/components/elements/Dialog'
import { Pagination } from '@/components/elements/Pagination'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { sliceState } from '@/interface/state'
import Link from 'next/link'
import { showToast } from '@/store/toast'
import { articlesAsync, changePage } from '@/store/articles'
import { cn } from '@/utils'
import { deleteArticles } from '@/services/articlesService'
import { categoriesAsync } from '@/store/categories'

const ArticleList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const articlesState = useSelector((state: sliceState) => state.articles)
  const categories = useSelector((state: sliceState) => state.categories.data)
  const articles = articlesState.data
  const [isShowDialog, setIsShowDialog] = useState(false)
  const [idDelete, setIdDelete] = useState('')

  useEffect(() => {
    dispatch(articlesAsync())
    dispatch(categoriesAsync())
  }, [dispatch])

  const handleChangePage = (page: number) => {
    dispatch(changePage(page))
    dispatch(articlesAsync())
  }

  const handleDeleteItem = () => {
    deleteArticles(idDelete)
      .then(() => {
        dispatch(articlesAsync())
        dispatch(
          showToast({
            message: 'Success to delete user',
            type: 'green',
          })
        )
      })
      .catch(() => {
        dispatch(
          showToast({
            message: 'Faild to delete',
            type: 'red',
          })
        )
      })
    toggleShowDialog(false)
  }

  const handleConfirmDelete = (id: string) => {
    setIdDelete(id)
    toggleShowDialog(true)
  }

  const toggleShowDialog = (value: boolean) => {
    setIsShowDialog(value)
  }

  return (
    <>
      <div
        data-testid="card-element"
        ref={ref}
        className={cn('relative overflow-x-auto', className)}
        {...props}
      >
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-shadow text-xs">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Slug
              </th>
              <th scope="col" className="px-6 py-3">
                Categories
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 && (
              <tr className="border-b border-b-gray-shadow bg-white text-center">
                <td colSpan={6}>Articles not yet available</td>
              </tr>
            )}
            {articles.length > 0 &&
              articles.map((article) => (
                <tr
                  className="border-b border-b-gray-shadow bg-white"
                  key={article._id}
                >
                  <td scope="row" className="whitespace-nowrap px-6 py-4">
                    {article.title}
                  </td>
                  <td className="px-6 py-4">{article.status}</td>
                  <td className="px-6 py-4">{article.slug}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {categories.map(
                        (category) =>
                          article.categories.includes(category._id) && (
                            <Button
                              variant="ghost"
                              key={category._id}
                              className="px-2 py-1 text-xs lg:text-xs"
                            >
                              {category.name}
                            </Button>
                          )
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">{article.author.name}</td>
                  <td className="justif-around flex gap-2 px-6 py-4">
                    <Link href={`article/${article.slug}/detail`}>
                      <Button theme="primary" className="px-3 py-1">
                        Detail
                      </Button>
                    </Link>
                    <Link href={`article/${article.slug}/edit`}>
                      <Button theme="yellow" className="px-3 py-1">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      theme="red"
                      className="px-3 py-1"
                      onClick={() => handleConfirmDelete(article._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination
        className="float-right mt-5"
        onPageChange={handleChangePage}
        currentPage={articlesState.page}
        lastPage={articlesState.totalPage}
      />

      <Dialog
        isShow={isShowDialog}
        className="flex w-[280px] flex-col items-center"
        onClose={() => toggleShowDialog(false)}
      >
        <div className="mb-5 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-red">
          <ExclamationCircleIcon className="w-[30px] stroke-2 text-white" />
        </div>
        <p className="text-sm">are you sure to delete this article ?</p>
        <p
          className="my-6 cursor-pointer text-sm font-bold text-primary"
          onClick={() => handleDeleteItem()}
          data-testid="confirm-element"
        >
          Ya, Lanjutkan
        </p>
        <Button
          className="cursor-pointer text-sm font-bold text-red"
          theme="red"
          variant="ghost"
          onClick={() => toggleShowDialog(false)}
        >
          Batalkan
        </Button>
      </Dialog>
    </>
  )
})
ArticleList.displayName = 'ArticleList'

export { ArticleList }
