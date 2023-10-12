import { CategoriesPayload, CategoriesResponse } from '@/interface/categories'
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
