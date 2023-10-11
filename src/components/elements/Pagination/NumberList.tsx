import { useMemo, useState } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils'

interface PaginationArgs {
  currentPage: number
  lastPage: number
  pageRangeDisplayed?: number
}

interface NumberListProps
  extends PaginationArgs,
    React.HTMLAttributes<HTMLUListElement> {
  onPageChange: (e: number) => void
}

const pageVariants = cva('mx-2 text-sm', {
  variants: {
    isActive: {
      true: 'bg-cobalt rounded-full p-2 w-6 h-6 text-black font-bold flex items-center justify-center',
      false: 'cursor-pointer',
    },
  },
  defaultVariants: {
    isActive: false,
  },
})

const sideCurrentPageList = ({
  currentPage,
  lastPage,
  pageRangeDisplayed = 7,
}: PaginationArgs): { leftSide: number; rightSide: number } => {
  let leftSide = Math.round(pageRangeDisplayed / 2)
  let rightSide = pageRangeDisplayed - leftSide

  if (currentPage > lastPage - leftSide) {
    rightSide = lastPage - currentPage
    leftSide = pageRangeDisplayed - rightSide
  } else if (currentPage < leftSide) {
    leftSide = currentPage
    rightSide = pageRangeDisplayed - leftSide
  }

  return {
    leftSide,
    rightSide,
  }
}

const NumberList = ({
  onPageChange,
  currentPage,
  lastPage,
  pageRangeDisplayed,
  className,
  ...props
}: NumberListProps) => {
  const [items, setItems] = useState<number[]>([])

  const handleClickPage = (item: number) => {
    if (item !== currentPage) onPageChange(item)
  }

  const generateList = () => {
    setItems([])
    if (pageRangeDisplayed && lastPage <= pageRangeDisplayed) {
      for (let index = 1; index <= lastPage; index++) {
        setItems((prevState: number[]) => {
          prevState.push(index)
          return prevState
        })
      }
    } else {
      const { leftSide, rightSide } = sideCurrentPageList({
        currentPage,
        lastPage,
        pageRangeDisplayed,
      })

      for (
        let index = currentPage - leftSide + 1;
        index <= currentPage + rightSide;
        index++
      ) {
        setItems((prevState: number[]) => {
          prevState.push(index)
          return prevState
        })
      }
    }
  }

  useMemo(() => {
    generateList()
  }, [currentPage, lastPage, pageRangeDisplayed])

  return (
    <ul className={cn('flex items-center', className)} {...props}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(pageVariants({ isActive: item === currentPage }))}
          onClick={() => handleClickPage(item)}
        >
          {item}
        </li>
      ))}

      {pageRangeDisplayed &&
        currentPage < lastPage - Math.floor(pageRangeDisplayed / 2) && (
          <>
            <li>...</li>
            <li
              className="mx-2 cursor-pointer text-sm"
              onClick={() => handleClickPage(lastPage)}
            >
              {lastPage}
            </li>
          </>
        )}
    </ul>
  )
}

export { NumberList, sideCurrentPageList }
export type { PaginationArgs }
