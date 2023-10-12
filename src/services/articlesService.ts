import { ArticlesPayload, ArticlesResponse } from '@/interface/articles'
import http from './baseService'

export const articles = async (
  payload: ArticlesPayload
): Promise<ArticlesResponse> => {
  const { data } = await http.get('articles', {
    params: payload,
  })
  return data
}

export const deleteArticles = async (id: string): Promise<ArticlesResponse> => {
  return await http.delete(`articles/${id}`)
}
