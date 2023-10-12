import http from './baseService'
import { RolesResponse } from '@/interface/roles'

export const roles = async (): Promise<RolesResponse> => {
  const { data } = await http.get('auth/me')
  return data
}
