import http from './baseService'
import { LoginInputForm, LoginResponse } from '@/interface/auth'

export const loginUser = async (
  payload: LoginInputForm
): Promise<LoginResponse> => {
  const { data } = await http.post('auth/login', payload)
  return data
}
