import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import ToastFloat from '@/components/modules/ToastFloat/ToastFloat'
import type { NextComponentType } from 'next'
import { useSession, SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import store from '@/store/store'
import { DataResponse } from '@/interface/auth'
import http from '@/services/baseService'

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean } // add auth type
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
        <ToastFloat />
      </SessionProvider>
    </Provider>
  )
}

function Auth({ children }: { children: React.ReactNode }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data: session, status } = useSession({ required: true })

  if (status === 'loading') {
    return <div></div>
  }
  const user = session?.user as DataResponse
  if (user)
    http.defaults.headers.common.Authorization = 'Bearer ' + user?.access_token

  return children
}
