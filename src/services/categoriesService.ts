import {
  CategoriesPayload,
  CategoriesResponse,
  CategoryInputForm,
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
