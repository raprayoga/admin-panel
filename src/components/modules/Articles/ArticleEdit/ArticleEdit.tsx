import React, { useState, useEffect, useMemo } from 'react'
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
import { ArticleInputForm } from '@/interface/article'
import Select from '@/components/elements/Select'
import { articleAsync, articleEditAsync } from '@/store/article'
import dynamic from 'next/dynamic'

const ArticleEdit = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const categoriesList = useSelector(
    (state: sliceState) => state.categories.data
  )
  const article = useSelector((state: sliceState) => state.article)
  const articleData = article.data
  const router = useRouter()
  const id = router.query.id as string
  const Editor = useMemo(() => {
    return dynamic(() => import('../../../elements/Editor/Editor'), {
      ssr: false,
    })
  }, [])

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
    dispatch(articleEditAsync({ ...data, id: id }))
  }

  useEffect(() => {
    dispatch(categoriesAsync())
    dispatch(articleAsync(id))
  }, [])

  useEffect(() => {
    if (article.error) {
      dispatch(
        showToast({
          message: article.error?.message,
          type: 'red',
        })
      )
    }
    if (article.successFetch) {
      dispatch(
        showToast({
          message: 'success update article',
          type: 'green',
        })
      )

      router.back()
    }
  }, [article.error, article.successFetch, dispatch, router])

  const handleChangeCategories = (ability: string) => {
    const tempCategories = watch('categories').map((category) => category)
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
      {articleData && articleData._id === id && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              rules={{ required: formRules.required }}
              defaultValue={articleData.title}
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
              defaultValue={articleData.description}
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
              defaultValue={articleData.thumbnail}
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
              defaultValue={articleData.status}
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

            <Controller
              control={control}
              defaultValue={articleData.categories}
              render={({ field: { onBlur, value } }) => (
                <div className="mb-4">
                  <div className="grid grid-cols-fill-12">
                    {categoriesList.map((category) => (
                      <div
                        key={category._id}
                        className="mb-4 flex items-center"
                      >
                        <input
                          id={category._id}
                          type="checkbox"
                          className="bg-gray-100 border-gray-300  h-4 w-4 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                          onBlur={onBlur}
                          onChange={() => handleChangeCategories(category._id)}
                          value={value}
                          checked={
                            watch('categories') &&
                            watch('categories').includes(category._id)
                          }
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
              defaultValue={articleData.content}
              rules={{ required: formRules.required }}
              render={({
                field: { onChange, onBlur },
                fieldState: { isDirty, error },
              }) => (
                <div
                  className={`mb-4 border border-${getVariant(
                    isDirty,
                    !!error
                  )}`}
                >
                  <Editor
                    onChange={(data) => {
                      onChange(data)
                    }}
                    onBlur={onBlur}
                    data={articleData.content}
                  />

                  <span className="float-right text-[10px] text-red">
                    {errors.content ? errors.content.message : ''}
                  </span>
                </div>
              )}
              name="content"
            />

            <Button
              theme="primary"
              className="mt-8 w-full"
              isLoading={article.loading}
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
ArticleEdit.displayName = 'ArticleEdit'

export { ArticleEdit }
