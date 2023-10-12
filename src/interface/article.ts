export interface ArticleSliceState {
  successFetch: boolean
  loading: boolean
  data: null | DataResponse
  error: null | ArticleResponse
}

export interface ArticleResponse {
  statusCode: number
  message: string
  data: DataResponse
}

export interface DataResponse {
  _id: string
  title: string
  status: string
  content: string
  description: string
  categories: string[]
  thumbnail: string
  author: Author
  createdAt: string
  updatedAt: string
  slug: string
}

interface Author {
  _id: string
  name: string
  avatar: string
}

export interface ArticleInputForm {
  id: string
  title: string
  description: string
  thumbnail: string
  content: string
  status: string
  categories: Category[]
  author: string
}

interface Category {
  name: string
  slug: string
}
