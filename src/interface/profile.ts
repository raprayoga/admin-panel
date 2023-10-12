export interface ProfileSliceState {
  loading: boolean
  data: null | DataResponse
  error: null | ProfileResponse
}

export interface ProfileResponse {
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
