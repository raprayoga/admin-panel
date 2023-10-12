import React, { useState, useEffect } from 'react'
import Button from '@/components/elements/Button'
import { Input, InputGroup } from '@/components/elements/InputGroup'
import {
  AtSymbolIcon,
  CameraIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { cn, formRules, getVariant } from '@/utils'
import { useRouter } from 'next/router'
import Select from '@/components/elements/Select'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { UserAddInputForm } from '@/interface/user'
import { roles } from '@/services/permissionsService'
import { DataResponse } from '@/interface/roles'
import { addUsers } from '@/services/usersService'
import { showToast } from '@/store/toast'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const UserAdd = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const router = useRouter()
  const [rolesList, setRolesList] = useState<DataResponse[]>([])
  const [isShowPass, setIsShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAddInputForm>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<UserAddInputForm> = async (data) => {
    setIsLoading(true)
    addUsers(data)
      .then(() => {
        dispatch(
          showToast({
            message: 'success add user',
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

  useEffect(() => {
    fetchRole()
  }, [])

  const fetchRole = async () => {
    const data = await roles()
    setRolesList(data.data)
  }

  const handleCancel = () => {
    router.back()
  }

  const handleToggleShowPass = () => {
    setIsShowPass((prevState) => {
      return !prevState
    })
  }

  return (
    <div {...props} className={cn('mx-auto w-4/5 ', className)} ref={ref}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                <UserIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
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

        <Controller
          control={control}
          rules={{ required: formRules.required, pattern: formRules.email }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { isDirty, error },
          }) => (
            <div className="mb-4">
              <InputGroup className="w-full">
                <AtSymbolIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                <Input
                  name="email"
                  className="pl-6"
                  placeholder="input email"
                  theme={getVariant(isDirty, !!error)}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </InputGroup>

              <span className="text-redy float-right text-[10px] text-red">
                {errors.email ? errors.email.message : ''}
              </span>
            </div>
          )}
          name="email"
        />

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
                <ChatBubbleOvalLeftEllipsisIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                <Input
                  name="bio"
                  className="pl-6"
                  placeholder="input bio"
                  theme={getVariant(isDirty, !!error)}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </InputGroup>

              <span className="text-redy float-right text-[10px] text-red">
                {errors.bio ? errors.bio.message : ''}
              </span>
            </div>
          )}
          name="bio"
        />

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
                <CameraIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                <Input
                  name="avatar"
                  className="pl-6"
                  placeholder="input avatar"
                  theme={getVariant(isDirty, !!error)}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </InputGroup>

              <span className="text-redy float-right text-[10px] text-red">
                {errors.avatar ? errors.avatar.message : ''}
              </span>
            </div>
          )}
          name="avatar"
        />

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
                <Select
                  name="role"
                  className="pl-6"
                  theme={getVariant(isDirty, !!error)}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                >
                  <option className="text-gray">Choose Role</option>
                  {rolesList.map((role) => (
                    <option value={role._id} key={role._id}>
                      {role.name}
                    </option>
                  ))}
                </Select>
              </InputGroup>

              <span className="text-redy float-right text-[10px] text-red">
                {errors.roleId ? errors.roleId.message : ''}
              </span>
            </div>
          )}
          name="roleId"
        />

        <Controller
          control={control}
          rules={{
            required: formRules.required,
            minLength: formRules.minLength(8),
          }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { isDirty, error },
          }) => (
            <>
              <InputGroup className="w-full">
                <UserIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                <Input
                  name="password"
                  type={isShowPass ? 'text' : 'password'}
                  placeholder="input password"
                  className="px-6"
                  theme={getVariant(isDirty, !!error)}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
                <div
                  onClick={handleToggleShowPass}
                  className="absolute left-auto right-2 cursor-pointer"
                >
                  {!isShowPass && (
                    <EyeIcon className="w-3 stroke-2 text-gray" />
                  )}
                  {isShowPass && (
                    <EyeSlashIcon className="w-3 stroke-2 text-gray" />
                  )}
                </div>
              </InputGroup>

              <span className="float-right text-[10px] text-red">
                {errors.password ? errors.password.message : ''}
              </span>
            </>
          )}
          name="password"
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
UserAdd.displayName = 'UserAdd'

export { UserAdd }
