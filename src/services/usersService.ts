import http from './baseService'
import { UsersResponse, UsersPayload } from '@/interface/users'

export const users = async (payload: UsersPayload): Promise<UsersResponse> => {
  const { data } = await http.get('users', {
    params: payload,
  })
  return data
}

export const deleteUser = async (id: string) => {
  return await http.delete(`users/${id}`)
}
