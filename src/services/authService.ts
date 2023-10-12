import http from './baseService'
import { ProfileResponse } from '@/interface/profile'
import { LoginInputForm, LoginResponse } from '@/interface/auth'

export const loginUser = async (
  payload: LoginInputForm
): Promise<LoginResponse> => {
  const { data } = await http.post('auth/login', payload)
  return data
}

export const profile = async (): Promise<ProfileResponse> => {
  const { data } = await http.get('auth/me')
  return data
}
