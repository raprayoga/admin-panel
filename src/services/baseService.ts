import axios from 'axios'

export default axios.create({
  baseURL: 'https://api-test.sinardigital.co.id/',
  headers: {
    'Content-type': 'application/json',
    common: {
      Authorization: '',
    },
  },
})
