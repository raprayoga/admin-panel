import React, { useState } from 'react'
import { cn } from '@/utils'
import { useSelector, useDispatch } from 'react-redux'
import { sliceState } from '@/interface/state'
import Button from '@/components/elements/Button'
import { Pagination } from '@/components/elements/Pagination'
import { changePage, usersAsync } from '@/store/users'
import { Dispatch } from '@reduxjs/toolkit'
import { deleteUser } from '@/services/usersService'
import { showToast } from '@/store/toast'
import Dialog from '@/components/elements/Dialog'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const UserList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const userState = useSelector((state: sliceState) => state.users)
  const users = userState.data
  const [isShowDialog, setIsShowDialog] = useState(false)
  const [idDelete, setIdDelete] = useState('')

  const handleChangePage = (page: number) => {
    dispatch(changePage(page))
    dispatch(usersAsync())
  }

  const handleDeleteItem = () => {
    deleteUser(idDelete)
      .then(() => {
        dispatch(usersAsync())
        dispatch(
          showToast({
            message: 'Success to delete',
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
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr className="text-center">
                <td colSpan={4}>Menu belum tersedia</td>
              </tr>
            )}
            {users.length > 0 &&
              users.map((item) => (
                <tr
                  className="border-b border-b-gray-shadow bg-white"
                  key={item._id}
                >
                  <td scope="row" className="whitespace-nowrap px-6 py-4">
                    {item.name}
                  </td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.role.name}</td>
                  <td className="justif-around flex gap-2 px-6 py-4">
                    <Link href={`users/${item._id}/detail`}>
                      <Button className="px-3 py-1">Detail</Button>
                    </Link>
                    <Link href={`users/${item._id}/edit`}>
                      <Button theme="yellow" className="px-3 py-1">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      theme="red"
                      className="px-3 py-1"
                      onClick={() => handleConfirmDelete(item._id)}
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
        currentPage={userState.page}
        lastPage={userState.totalPage}
      />

      <Dialog
        isShow={isShowDialog}
        className="flex w-[280px] flex-col items-center"
        onClose={() => toggleShowDialog(false)}
      >
        <div className="mb-5 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-red">
          <ExclamationCircleIcon className="w-[30px] stroke-2 text-white" />
        </div>
        <p className="text-sm">Yakin membuat order ?</p>
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
UserList.displayName = 'UserList'

export { UserList }
