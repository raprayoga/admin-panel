import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import ToastFloat from '@/components/modules/ToastFloat/ToastFloat'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastFloat />
    </>
  )
}
