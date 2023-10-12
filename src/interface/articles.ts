export interface ArticlesResponse {
  statusCode: number
  message: string
  data: DataResponse
}

export interface DataResponse {
  docs: DocsResponse[]
  page: number
  totalPages: number
}

export interface DocsResponse {
  _id: string
  title: string
  status: string
  categories: string[]
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

export interface ArticlesInputForm {
  title: string
  status: string
  categories: string
}
