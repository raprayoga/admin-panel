import React, { useState, useEffect } from 'react'
import Button from '@/components/elements/Button'
import { Input, InputGroup } from '@/components/elements/InputGroup'
import { cn, formRules, getVariant } from '@/utils'
import { CodeBracketIcon, TagIcon } from '@heroicons/react/24/outline'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { showToast } from '@/store/toast'
import { CategoryEditForm, DocsResponse } from '@/interface/categories'
import { category, editCategories } from '@/services/categoriesService'

const CategoryEdit = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [categoryData, setCategoryData] = useState<DocsResponse>()
  const slug = router.query.slug as string
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryEditForm>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<CategoryEditForm> = async (data) => {
    setIsLoading(true)
    if (categoryData?._id == undefined) return
    editCategories({ ...data, id: categoryData._id })
      .then(() => {
        dispatch(
          showToast({
            message: 'success to edit category',
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
    fetchCategory()
  }, [])

  const fetchCategory = async () => {
    const data = await category(slug)
    setCategoryData(data.data)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div {...props} className={cn('mx-auto w-4/5 ', className)} ref={ref}>
      {categoryData && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              rules={{ required: formRules.required }}
              defaultValue={categoryData?.name}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { isDirty, error },
              }) => (
                <div className="mb-4">
                  <InputGroup className="w-full">
                    <TagIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                    <Input
                      name="name"
                      className="pl-6"
                      placeholder="input category name"
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
              rules={{ required: formRules.required }}
              defaultValue={categoryData?.slug}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { isDirty, error },
              }) => (
                <div className="mb-4">
                  <InputGroup className="w-full">
                    <CodeBracketIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                    <Input
                      name="name"
                      className="pl-6"
                      placeholder="input category slug"
                      theme={getVariant(isDirty, !!error)}
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                  </InputGroup>

                  <span className="float-right text-[10px] text-red">
                    {errors.slug ? errors.slug.message : ''}
                  </span>
                </div>
              )}
              name="slug"
            />

            <Button
              theme="primary"
              className="mt-8 w-full"
              isLoading={isLoading}
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
CategoryEdit.displayName = 'CategoryEdit'

export { CategoryEdit }
