import React, { useState, useEffect } from 'react'
import Button from '@/components/elements/Button'
import Image from 'next/image'
import { Input, InputGroup } from '@/components/elements/InputGroup'
import {
  AtSymbolIcon,
  CameraIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { cn, formRules, getVariant } from '@/utils'
import profilePhoto from '@/assets/images/male-avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { sliceState } from '@/interface/state'
import Select from '@/components/elements/Select'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { UserEditInputForm } from '@/interface/user'
import { Dispatch } from '@reduxjs/toolkit'
import { userAsync, userEditAsync } from '@/store/user'
import { showToast } from '@/store/toast'
import { rolesAsync } from '@/store/roles'

const UserEdit = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const user = useSelector((state: sliceState) => state.user)
  const rolesList = useSelector((state: sliceState) => state.roles.data)
  const userData = user?.data
  const router = useRouter()
  const [src, setSrc] = useState<
    string | typeof profilePhoto | null | undefined
  >(userData?.avatar)
  const id = router.query.id as string

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditInputForm>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<UserEditInputForm> = async (data) => {
    if (userData) dispatch(userEditAsync({ ...data, id: userData._id }))
  }

  useEffect(() => {
    dispatch(userAsync(id))
    dispatch(rolesAsync())
  }, [])

  useEffect(() => {
    if (user.error) {
      dispatch(
        showToast({
          message: user.error?.message,
          type: 'red',
        })
      )
    }
    if (user.successFetch) {
      dispatch(
        showToast({
          message: 'success to update user',
          type: 'green',
        })
      )

      router.back()
    }
  }, [dispatch, router, user.error, user.successFetch])

  const handleCancel = () => {
    router.back()
  }

  return (
    <div {...props} className={cn('mx-auto w-4/5 ', className)} ref={ref}>
      <div className="mb-10 flex flex-col items-center justify-center text-center">
        <div className="relative">
          <Image
            src={src || ''}
            alt="logo"
            width={125}
            height={125}
            className="h-[125px] w-[125px] rounded-full"
            onError={() => setSrc(profilePhoto)}
          />
        </div>
        <h2 className="mb-3 ml-1 mt-5 text-center text-3xl font-semibold">
          {userData?.name}
        </h2>
        <q>{userData?.bio}</q>
      </div>

      {userData && userData._id === id && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="">Name</label>
            <Controller
              control={control}
              rules={{ required: formRules.required }}
              defaultValue={userData?.name}
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

            <label className="">Email</label>
            <Controller
              control={control}
              rules={{ required: formRules.required, pattern: formRules.email }}
              defaultValue={userData?.email}
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

            <label className="">Bio</label>
            <Controller
              control={control}
              rules={{ required: formRules.required }}
              defaultValue={userData?.bio}
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

            <label className="">Avatar</label>
            <Controller
              control={control}
              rules={{ required: formRules.required }}
              defaultValue={userData?.avatar}
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

            <label className="">Role</label>
            <Controller
              control={control}
              rules={{ required: formRules.required }}
              defaultValue={userData?.role._id}
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

            <Button
              theme="primary"
              className="mt-8 w-full"
              isLoading={user.loading}
            >
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
        </>
      )}
    </div>
  )
})
UserEdit.displayName = 'UserEdit'

export { UserEdit }
