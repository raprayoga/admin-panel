import Article from '@/components/templates/Article'
import { useSession } from 'next-auth/react'
export default function HomePage() {
  const { data: session, status, update } = useSession()

  return (
    <>
      <Article />
    </>
  )
}

HomePage.auth = true
