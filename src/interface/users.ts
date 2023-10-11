export interface UsersPayload {
  name?: string
  email?: string
  roleId?: string
  page?: string
  limit?: string
}

export interface UsersResponse {
  statusCode: number
  message: string
  data: DataResponse
}

interface DataResponse {
  docs: DocsResponse[]
  page: number
  totalPages: number
}

export interface DocsResponse {
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

export interface UsersSliceState {
  loading: boolean
  data: DocsResponse[]
  error?: null | UsersResponse
  page: number
  totalPage: number
  form: UsersPayload
}
