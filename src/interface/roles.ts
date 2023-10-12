export interface RolesResponse {
  statusCode: number
  message: string
  data: DataResponse[]
}

export interface DataResponse {
  _id: string
  name: string
  permissions: string[]
}

export interface RolesSliceState {
  loading: boolean
  data: DataResponse[]
  error?: null | RolesResponse
}

export interface RolesInputForm {
  name: string
  permissions: string[]
}

export interface PermissionsResponse {
  statusCode: number
  message: string
  data: DataPermissionsResponse[]
}

export interface DataPermissionsResponse {
  module: string
  abilities: string[]
}
