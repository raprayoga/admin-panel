export interface UserSliceState {
  successFetch: boolean
  loading: boolean
  data: null | DataResponse
  error: null | UserResponse
}

export interface UserResponse {
  statusCode: number
  message: string
  data: DataResponse
}

export interface DataResponse {
  _id: string
  name: string
  email: string
  emailVerifiedAt: string
  avatar: string
  bio: string
  role: DataRole
}

interface DataRole {
  _id: string
  name: string
  permissions: string[]
}

export interface UserEditInputForm {
  id: string
  name: string
  email: string
  bio: string
  avatar: string
  roleId: string
}

export interface UserAddInputForm {
  name: string
  email: string
  bio: string
  avatar: string
  roleId: string
  password: string
}
