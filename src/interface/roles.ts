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
