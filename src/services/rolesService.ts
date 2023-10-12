import http from './baseService'
import {
  PermissionsResponse,
  RolesInputForm,
  RolesResponse,
} from '@/interface/roles'

export const roles = async (): Promise<RolesResponse> => {
  const { data } = await http.get('roles')
  return data
}

export const permissions = async (): Promise<PermissionsResponse> => {
  const { data } = await http.get('roles/permissions')
  return data
}

export const deleteRole = async (id: string): Promise<RolesResponse> => {
  return await http.delete(`users/${id}`)
}

export const addRoles = async (
  payload: RolesInputForm
): Promise<RolesResponse> => {
  const { data } = await http.post('roles', payload)
  return data
}
