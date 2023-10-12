import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  InboxArrowDownIcon,
  TableCellsIcon,
  UserCircleIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/utils'

const SideBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const router = useRouter()

  return (
    <>
      <aside
        className={cn(
          'h-screen w-1/5 min-w-[100px] bg-primary px-2.5 py-5',
          className
        )}
        {...props}
        ref={ref}
      >
        <h2 className="mx-2.5 mb-5 mt-2 text-2xl font-bold text-white">
          <span className="block text-sm">Portal</span>
          Admin
        </h2>
        <ul>
          <li
            className={`mx-2.5 my-2 ${
              router.pathname === '/' ? 'text-white' : 'text-gray'
            }`}
          >
            <Link href="/" className="flex">
              <TableCellsIcon className="mr-2 w-4" />
              Article
            </Link>
          </li>
          <li
            className={`mx-2.5 my-2 ${
              router.pathname === '/category' ? 'text-white' : 'text-gray'
            }`}
          >
            <Link href="/category" className="flex">
              <InboxArrowDownIcon className="mr-2 w-4" />
              Category
            </Link>
          </li>
          <li
            className={`mx-2.5 my-2 ${
              router.pathname.includes('/roles') ? 'text-white' : 'text-gray'
            }`}
          >
            <Link href="/roles" className="flex">
              <WrenchScrewdriverIcon className="mr-2 w-4" />
              Roles
            </Link>
          </li>
          <li
            className={`mx-2.5 my-2 ${
              router.pathname.includes('/users') ? 'text-white' : 'text-gray'
            }`}
          >
            <Link href="/users" className="flex">
              <UserGroupIcon className="mr-2 w-4" />
              Users
            </Link>
          </li>
          <li
            className={`mx-2.5 my-2 ${
              router.pathname === '/profile' ? 'text-white' : 'text-gray'
            }`}
          >
            <Link href="/profile" className="flex">
              <UserCircleIcon className="mr-2 w-4" />
              Profile
            </Link>
          </li>
        </ul>
      </aside>
    </>
  )
})
SideBar.displayName = 'SideBar'

export { SideBar }
