import { signOut } from "next-auth/react";
import Router from 'next/router'

export const autoSignOut = async () => {
    await signOut()
    Router.push('/login')
}