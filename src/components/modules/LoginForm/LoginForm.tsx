import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { Input, InputGroup } from '@/components/elements/InputGroup'
import {
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import avatar from '@/assets/images/male-avatar.png'
import Button from '@/components/elements/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LoginInputForm } from '@/interface/auth'
import { cn, formRules, getVariant } from '@/utils'
import useToastStore from '@/store/toast'

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter()
  const showToast = useToastStore((state) => state.showToast)
  const [isShowPass, setIsShowPass] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputForm>({
    mode: 'onChange',
  })

  // useEffect(() => {
  //   if (auth.error) {
  //     updateIsShow({
  //       isShow: true,
  //       type: 'red',
  //       message: auth.error?.message,
  //     })
  //   }

  //   if (auth.isLogin) {
  //     updateIsShow({
  //       isShow: true,
  //       type: 'green',
  //       message: 'Berhasil login',
  //     })

  //     router.push('/')
  //   }
  // }, [dispatch, auth.error, auth.isLogin, router])

  const onSubmit: SubmitHandler<LoginInputForm> = (data) => {
    // dispatch(loginAsync(data))
    console.log('SUBMIT')
    showToast({
      isShow: true,
      type: 'green',
      message: 'Berhasil login',
    })
  }

  const handleToggleShowPass = () => {
    setIsShowPass((prevState) => {
      return !prevState
    })
  }

  // useEffect(() => {
  //   if (auth.isLogin) router.push('/')
  // }, [auth.isLogin, router])

  return (
    <>
      <div {...props} className={cn('text-center', className)}>
        <Image
          src={avatar}
          alt="logo"
          width={200}
          height={200}
          className="mx-auto h-[200px] w-[200px]"
        />

        <div className="flex justify-center">
          <h3 className="my-10 w-4/5 text-3xl font-semibold">Login</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            rules={{ required: formRules.required, pattern: formRules.email }}
            defaultValue=""
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isDirty, error },
            }) => (
              <>
                <InputGroup className="w-full">
                  <AtSymbolIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                  <Input
                    type="email"
                    placeholder="masukan email anda"
                    className="pl-6"
                    theme={getVariant(isDirty, !!error)}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
                <span className="float-right text-[10px] text-red">
                  {errors.email ? errors.email.message : ''}
                </span>
              </>
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
              <>
                <InputGroup className="mt-8 w-full">
                  <UserIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                  <Input
                    name="last_name"
                    type={isShowPass ? 'text' : 'password'}
                    placeholder="masukan password anda"
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

          <Button
            type="submit"
            theme="primary"
            className="mt-8 w-full"
            // isLoading={auth.loading}
          >
            Login
          </Button>
        </form>

        <div className="mt-5">
          <span className="text-xs ">
            belum punya akun? registrasi{' '}
            <Link href="/register" className="font-bold text-primary">
              di sini
            </Link>
          </span>
        </div>
      </div>
    </>
  )
}
