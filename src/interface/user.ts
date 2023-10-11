export interface UserSliceState {
  loading: boolean
  data: null | UserResponse
  error: null | UserResponse
}

export interface DataResponse {
  data: UserResponse
}

export interface UserResponse {
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
