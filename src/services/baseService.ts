import axios from 'axios'
import { BASE_API_URL } from '@/utils'

export default axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-type': 'application/json',
    common: {
      Authorization: '',
    },
  },
})
