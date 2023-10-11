import axios from 'axios'
import { BASE_API_URL } from '@/utils'

export default axios.create({
  baseURL: 'https://api-test.sinardigital.co.id/',
  headers: {
    'Content-type': 'application/json',
    common: {
      Authorization: '',
    },
  },
})
