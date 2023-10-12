import {
  CategoriesPayload,
  CategoriesResponse,
  CategoryEditForm,
  CategoryInputForm,
  CategoryResponse,
} from '@/interface/categories'
import http from './baseService'

export const categories = async (
  payload: CategoriesPayload
): Promise<CategoriesResponse> => {
  const { data } = await http.get('categories', {
    params: payload,
  })
  return data
}

export const category = async (slug: string): Promise<CategoryResponse> => {
  const { data } = await http.get(`categories/${slug}`)
  return data
}

export const deleteCategories = async (
  id: string
): Promise<CategoriesResponse> => {
  return await http.delete(`categories/${id}`)
}

export const addCategories = async (
  payload: CategoryInputForm
): Promise<CategoriesResponse> => {
  const { data } = await http.post('categories', payload)
  return data
}

export const editCategories = async (
  payload: CategoryEditForm
): Promise<CategoriesResponse> => {
  const { data } = await http.patch(`categories`, payload)
  return data
}
