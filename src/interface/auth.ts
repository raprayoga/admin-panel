export interface LoginInputForm {
  email: string
  password: string
}

export interface LoginResponse {
  statusCode: number
  message: string
  data: DataRespnse
}

interface DataRespnse {
  id: string
  name: string
  email: string
  bio: string
  avatar: string
  role: DataRole
  access_token: string
  refresh_token: string
}

interface DataRole {
  _id: string
  name: string
  permision: string[]
}
