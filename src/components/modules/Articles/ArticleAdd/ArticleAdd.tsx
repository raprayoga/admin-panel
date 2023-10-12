import React, { useState, useEffect } from 'react'
import Button from '@/components/elements/Button'
import { Input, InputGroup } from '@/components/elements/InputGroup'
import {
  CameraIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EyeIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/outline'
import { cn, formRules, getVariant } from '@/utils'
import { useRouter } from 'next/router'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { showToast } from '@/store/toast'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { sliceState } from '@/interface/state'
import { categoriesAsync } from '@/store/categories'
import { addArticles } from '@/services/articlesService'
import { ArticleInputForm } from '@/interface/article'
import Select from '@/components/elements/Select'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const ArticleAdd = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const categoriesList = useSelector(
    (state: sliceState) => state.categories.data
  )
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleInputForm>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<ArticleInputForm> = async (data) => {
    setIsLoading(true)
    addArticles(data)
      .then(() => {
        dispatch(
          showToast({
            message: 'success add article',
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
    dispatch(categoriesAsync())
  }, [])

  const handleChangeCategories = (ability: string) => {
    const tempCategories = watch('categories')
    const index = tempCategories.findIndex(
      (permission) => ability === permission
    )
    if (index >= 0) {
      tempCategories.splice(index, 1)
    } else {
      tempCategories.push(ability)
    }
    setValue('categories', tempCategories)
  }

  const handleCancel = () => {
    router.back()
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
                <MegaphoneIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                <Input
                  name="title"
                  className="pl-6"
                  placeholder="input title"
                  theme={getVariant(isDirty, !!error)}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </InputGroup>

              <span className="float-right text-[10px] text-red">
                {errors.title ? errors.title.message : ''}
              </span>
            </div>
          )}
          name="title"
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
                  name="description"
                  className="pl-6"
                  placeholder="input description"
                  theme={getVariant(isDirty, !!error)}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </InputGroup>

              <span className="text-redy float-right text-[10px] text-red">
                {errors.description ? errors.description.message : ''}
              </span>
            </div>
          )}
          name="description"
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
                  name="thumbnail"
                  className="pl-6"
                  placeholder="input thumbnail"
                  theme={getVariant(isDirty, !!error)}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </InputGroup>

              <span className="text-redy float-right text-[10px] text-red">
                {errors.thumbnail ? errors.thumbnail.message : ''}
              </span>
            </div>
          )}
          name="thumbnail"
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
                <EyeIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
                <Select
                  name="status"
                  className="pl-6"
                  theme={getVariant(isDirty, !!error)}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                >
                  <option value="">Choose Status</option>
                  <option value="PUBLISHED">PUBLISHED</option>
                  <option value="PINNED">PINNED</option>
                </Select>
              </InputGroup>

              <span className="text-redy float-right text-[10px] text-red">
                {errors.status ? errors.status.message : ''}
              </span>
            </div>
          )}
          name="status"
        />

        <label className="">Category</label>
        <Controller
          control={control}
          defaultValue={[]}
          rules={{ required: formRules.required }}
          render={({ field: { onBlur } }) => (
            <div className="mb-4">
              <div className="grid grid-cols-fill-12">
                {categoriesList.map((category) => (
                  <div key={category._id} className="mb-4 flex items-center">
                    <input
                      id={category._id}
                      type="checkbox"
                      name="categories"
                      className="bg-gray-100 border-gray-300  h-4 w-4 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                      onBlur={onBlur}
                      onChange={() => handleChangeCategories(category._id)}
                    />
                    <label
                      htmlFor={category._id}
                      className="text-gray-900 ml-2 text-sm font-medium"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>

              <span className="float-right text-[10px] text-red">
                {errors.categories ? errors.categories.message : ''}
              </span>
            </div>
          )}
          name="categories"
        />

        <Controller
          control={control}
          defaultValue=""
          rules={{ required: formRules.required }}
          render={({
            field: { onChange, onBlur },
            fieldState: { isDirty, error },
          }) => (
            <div
              className={`mb-4 border border-${getVariant(isDirty, !!error)}`}
            >
              <CKEditor
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  onChange(data)
                }}
                onBlur={onBlur}
              />

              <span className="float-right text-[10px] text-red">
                {errors.content ? errors.content.message : ''}
              </span>
            </div>
          )}
          name="content"
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
ArticleAdd.displayName = 'ArticleAdd'

export { ArticleAdd }
