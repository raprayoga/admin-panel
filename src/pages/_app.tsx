import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import ToastFloat from '@/components/modules/ToastFloat/ToastFloat'
import type { NextComponentType } from 'next'
import { useSession, SessionProvider } from 'next-auth/react'

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean } // add auth type
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
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
  )
}

function Auth({ children }: { children: React.ReactNode }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return children
}
