import { DataResponse } from '@/interface/user'
import http from './baseService'
import { UsersResponse, UsersPayload, DocsResponse } from '@/interface/users'

export const users = async (payload: UsersPayload): Promise<UsersResponse> => {
  const { data } = await http.get('users', {
    params: payload,
  })
  return data
}

export const user = async (id: string): Promise<DataResponse> => {
  const { data } = await http.get(`users/${id}`)
  return data
}

export const deleteUser = async (id: string): Promise<DocsResponse> => {
  return await http.delete(`users/${id}`)
}
