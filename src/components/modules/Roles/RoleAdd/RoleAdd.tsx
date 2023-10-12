import React, { useState, useEffect } from 'react'
import { cn, formRules, getVariant } from '@/utils'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Button from '@/components/elements/Button'
import { DataPermissionsResponse, RolesInputForm } from '@/interface/roles'
import { showToast } from '@/store/toast'
import { Input, InputGroup } from '@/components/elements/InputGroup'
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import { addRoles, permissions } from '@/services/rolesService'
import { useRouter } from 'next/router'

const RoleAdd = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [permissionList, setPermissionList] = useState<
    DataPermissionsResponse[]
  >([])
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RolesInputForm>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<RolesInputForm> = async (data) => {
    setIsLoading(true)
    addRoles(data)
      .then(() => {
        dispatch(
          showToast({
            message: 'success to add role',
            type: 'green',
          })
        )

        router.back()
      })
      .catch((error) => {
        dispatch(
          showToast({
            message: error.response.data.message,
            type: 'red',
          })
        )
      })
      .finally(() => setIsLoading(false))
  }

  const handleChangePermissions = (ability: string) => {
    const tempPermissions = watch('permissions')
    const index = tempPermissions.findIndex(
      (permission) => ability === permission
    )
    if (index >= 0) {
      tempPermissions.splice(index, 1)
    } else {
      tempPermissions.push(ability)
    }
    setValue('permissions', tempPermissions)
  }

  useEffect(() => {
    fetchhPermissions()
  }, [])

  const fetchhPermissions = async () => {
    const data = await permissions()
    setPermissionList(data.data)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div {...props} className={cn('mx-auto w-4/5 ', className)} ref={ref}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="">Name</label>
        <Controller
          control={control}
          rules={{ required: formRules.required }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { isDirty, error },
          }) => (
            <div className="mb-4">
              <InputGroup className="w-full">
                <WrenchScrewdriverIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                <Input
                  name="name"
                  className="pl-6"
                  placeholder="input name"
                  theme={getVariant(isDirty, !!error)}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </InputGroup>

              <span className="float-right text-[10px] text-red">
                {errors.name ? errors.name.message : ''}
              </span>
            </div>
          )}
          name="name"
        />

        <label className="">Permission</label>
        <Controller
          control={control}
          defaultValue={[]}
          rules={{ required: formRules.required }}
          render={({ field: { onBlur } }) => (
            <div className="mb-4">
              <div className="grid grid-cols-fill-12">
                {permissionList.map((permission) =>
                  permission.abilities.map((ability) => (
                    <div key={ability} className="mb-4 flex items-center">
                      <input
                        id={ability}
                        type="checkbox"
                        className="bg-gray-100 border-gray-300  h-4 w-4 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                        onBlur={onBlur}
                        onChange={() => handleChangePermissions(ability)}
                        checked={watch('permissions').includes(ability)}
                      />
                      <label
                        htmlFor={ability}
                        className="text-gray-900 ml-2 text-sm font-medium"
                      >
                        {ability}
                      </label>
                    </div>
                  ))
                )}
              </div>

              <span className="float-right text-[10px] text-red">
                {errors.permissions ? errors.permissions.message : ''}
              </span>
            </div>
          )}
          name="permissions"
        />

        <Button theme="primary" className="mt-8 w-full" isLoading={isLoading}>
          Submit
        </Button>
      </form>

      <Button
        theme="red"
        variant="ghost"
        className="mt-8 w-full"
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </div>
  )
})
RoleAdd.displayName = 'RoleAdd'

export { RoleAdd }
