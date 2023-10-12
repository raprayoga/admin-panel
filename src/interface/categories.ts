export interface CategoriesResponse {
  statusCode: number
  message: string
  data: DataResponse
}

export interface CategoryResponse {
  statusCode: number
  message: string
  data: DocsResponse
}

export interface CategoriesPayload {
  name?: string
  slug?: string
  page?: string
  limit?: string
}

export interface DataResponse {
  docs: DocsResponse[]
  page: number
  totalPages: number
}

export interface DocsResponse {
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

export interface CategoryInputForm {
  name: string
}

export interface CategoryEditForm {
  id: string
  name: string
  slug: string
}
