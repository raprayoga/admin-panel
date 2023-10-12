export interface CategoriesResponse {
  statusCode: number
  message: string
  data: DataResponse
}

export interface CategoriesPayload {
  name?: string
  slug?: string
  page?: string
  limit?: string
}

interface DataResponse {
  docs: DocsResponse[]
  page: number
  totalPages: number
}

interface DocsResponse {
  _id: string
  name: string
  slug: string
}

export interface CategoriesSliceState {
  loading: boolean
  data: DocsResponse[]
  error?: null | CategoriesResponse
  page: number
  totalPage: number
  form: CategoriesPayload
}
