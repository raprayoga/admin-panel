import { LoginInputForm } from '@/interface/auth'
import { loginUser } from '@/services/authService'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import http from '@/services/baseService'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as LoginInputForm
        const res = await loginUser({ email, password })
        if (res) {
          http.defaults.headers.common.Authorization = res.data.access_token
          return res.data
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
}

export default NextAuth(authOptions)
