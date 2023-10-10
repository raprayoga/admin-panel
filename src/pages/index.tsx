import { Inter } from 'next/font/google'
import { useSession, signOut } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session, status } = useSession()
  if (status === 'authenticated') {
    return (
      <>
        <p>Signed in as {session?.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return <div>Sign in</div>
}

Home.auth = true
