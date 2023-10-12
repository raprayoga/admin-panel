import http from './baseService'
import { RolesResponse } from '@/interface/roles'

export const roles = async (): Promise<RolesResponse> => {
  const { data } = await http.get('roles')
  return data
}

export const deleteRole = async (id: string): Promise<RolesResponse> => {
  return await http.delete(`users/${id}`)
}

// export const editUsers = async (
//   id: string,
//   payload: UserEditInputForm
// ): Promise<UserResponse> => {
//   const { data } = await http.patch('users', {
//     body: payload,
//     params: id,
//   })
//   return data
// }
