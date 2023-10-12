import http from './baseService'
import {
  RoleResponse,
  PermissionsResponse,
  RolesInputForm,
  RolesResponse,
} from '@/interface/roles'

export const roles = async (): Promise<RolesResponse> => {
  const { data } = await http.get('roles')
  return data
}

export const role = async (id: string): Promise<RoleResponse> => {
  const { data } = await http.get(`roles/${id}`)
  return data
}

export const permissions = async (): Promise<PermissionsResponse> => {
  const { data } = await http.get('roles/permissions')
  return data
}

export const deleteRole = async (id: string): Promise<RolesResponse> => {
  return await http.delete(`roles/${id}`)
}

export const addRoles = async (
  payload: RolesInputForm
): Promise<RolesResponse> => {
  const { data } = await http.post('roles', payload)
  return data
}

export const editRoles = async (
  id: string,
  payload: RolesInputForm
): Promise<RolesResponse> => {
  const { data } = await http.patch(`roles/${id}`, payload)
  return data
}
