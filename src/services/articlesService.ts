import { ArticlesPayload, ArticlesResponse } from '@/interface/articles'
import { ArticleInputForm, ArticleResponse } from '@/interface/article'
import http from './baseService'

export const articles = async (
  payload: ArticlesPayload
): Promise<ArticlesResponse> => {
  const { data } = await http.get('articles', {
    params: payload,
  })
  return data
}

export const article = async (id: string): Promise<ArticleResponse> => {
  const { data } = await http.get(`articles/${id}`)
  return data
}

export const deleteArticles = async (id: string): Promise<ArticlesResponse> => {
  return await http.delete(`articles/${id}`)
}

export const editArticles = async (
  payload: ArticleInputForm
): Promise<ArticleResponse> => {
  const { data } = await http.patch(`articles`, payload)
  return data
}

export const addArticles = async (
  payload: ArticleInputForm
): Promise<ArticleResponse> => {
  const { data } = await http.post(`articles`, payload)
  return data
}
