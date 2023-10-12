import React, { useState, useEffect } from 'react'
import Button from '@/components/elements/Button'
import Dialog from '@/components/elements/Dialog'
import { cn } from '@/utils'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { categoriesAsync, changePage } from '@/store/categories'
import { showToast } from '@/store/toast'
import { Pagination } from '@/components/elements/Pagination'
import { sliceState } from '@/interface/state'
import { deleteCategories } from '@/services/categoriesService'

const CategoryList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const categoriesState = useSelector((state: sliceState) => state.categories)
  const categories = categoriesState.data
  const [isShowDialog, setIsShowDialog] = useState(false)
  const [idDelete, setIdDelete] = useState('')

  useEffect(() => {
    dispatch(categoriesAsync())
  }, [dispatch])

  const handleChangePage = (page: number) => {
    dispatch(changePage(page))
    dispatch(categoriesAsync())
  }

  const handleDeleteItem = () => {
    deleteCategories(idDelete)
      .then(() => {
        dispatch(categoriesAsync())
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
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Slug
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 && (
              <tr className="border-b border-b-gray-shadow bg-white text-center">
                <td colSpan={3}>Categories not yet available</td>
              </tr>
            )}
            {categories.length > 0 &&
              categories.map((category) => (
                <tr
                  className="border-b border-b-gray-shadow bg-white"
                  key={category._id}
                >
                  <td scope="row" className="whitespace-nowrap px-6 py-4">
                    {category.name}
                  </td>
                  <td className="px-6 py-4">{category.slug}</td>
                  <td className="justif-around flex gap-2 px-6 py-4">
                    <Link href={`category/${category.slug}/edit`}>
                      <Button theme="yellow" className="px-3 py-1">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      theme="red"
                      className="px-3 py-1"
                      onClick={() => handleConfirmDelete(category._id)}
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
        currentPage={categoriesState.page}
        lastPage={categoriesState.totalPage}
      />

      <Dialog
        isShow={isShowDialog}
        className="flex w-[280px] flex-col items-center"
        onClose={() => toggleShowDialog(false)}
      >
        <div className="mb-5 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-red">
          <ExclamationCircleIcon className="w-[30px] stroke-2 text-white" />
        </div>
        <p className="text-sm">are you sure to delete this category ?</p>
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
CategoryList.displayName = 'CategoryList'

export { CategoryList }
