import React, { useState, useEffect } from 'react'
import Button from '@/components/elements/Button'
import Dialog from '@/components/elements/Dialog'
import { cn } from '@/utils'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { showToast } from '@/store/toast'
import { sliceState } from '@/interface/state'
import { rolesAsync } from '@/store/roles'
import { deleteRole } from '@/services/rolesService'

const RoleList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const rolesState = useSelector((state: sliceState) => state.roles)
  const roles = rolesState.data
  const [isShowDialog, setIsShowDialog] = useState(false)
  const [idDelete, setIdDelete] = useState('')

  useEffect(() => {
    dispatch(rolesAsync())
  }, [dispatch])

  const handleDeleteItem = () => {
    deleteRole(idDelete)
      .then(() => {
        dispatch(
          showToast({
            message: 'Success to delete role',
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
    dispatch(rolesAsync())
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
                Permission
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.length === 0 && (
              <tr className="border-b border-b-gray-shadow bg-white text-center">
                <td colSpan={3}>Roles not yet available</td>
              </tr>
            )}
            {roles.length > 0 &&
              roles.map((role) => (
                <tr
                  className="border-b border-b-gray-shadow bg-white"
                  key={role._id}
                >
                  <td scope="row" className="whitespace-nowrap px-6 py-4">
                    {role.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 ">
                      {role.permissions.map((permission) => (
                        <Button
                          variant="ghost"
                          key={permission}
                          className="px-3 py-1"
                          disabled
                        >
                          {permission}
                        </Button>
                      ))}
                    </div>
                  </td>
                  <td className="justif-around flex gap-2 px-6 py-4">
                    <Link href={`roles/${role._id}/edit`}>
                      <Button theme="yellow" className="px-3 py-1">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      theme="red"
                      className="px-3 py-1"
                      onClick={() => handleConfirmDelete(role._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Dialog
        isShow={isShowDialog}
        className="flex w-[280px] flex-col items-center"
        onClose={() => toggleShowDialog(false)}
      >
        <div className="mb-5 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-red">
          <ExclamationCircleIcon className="w-[30px] stroke-2 text-white" />
        </div>
        <p className="text-sm">are you sure to delete this role ?</p>
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
RoleList.displayName = 'RoleList'

export { RoleList }
