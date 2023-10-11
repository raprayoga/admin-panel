import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils'
import { NumberList, type PaginationArgs } from './NumberList'

const arrowVariants = cva('mx-2 h-4 w-4 text-cobalt', {
  variants: {
    isDisabled: {
      false: 'cursor-pointer',
      true: 'opacity-50',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
})

export interface PaginationProps
  extends PaginationArgs,
    React.HTMLAttributes<HTMLDivElement> {
  onPageChange: (e: number) => void
}

const Pagination = ({
  onPageChange,
  currentPage,
  lastPage,
  pageRangeDisplayed = 5,
  className,
  ...props
}: PaginationProps) => {
  const handleClickPage = (item: number) => {
    if (item !== currentPage) onPageChange(item)
  }

  const handleClickStartPage = () => {
    if (currentPage !== 1) onPageChange(1)
  }

  const handleClickPrev = () => {
    if (currentPage !== 1) onPageChange(currentPage - 1)
  }

  const handleClickNext = () => {
    if (currentPage < lastPage) onPageChange(currentPage + 1)
  }

  const handleClickLastPage = () => {
    if (currentPage < lastPage) onPageChange(lastPage)
  }

  return (
    <nav className={cn('flex items-center text-primary', className)} {...props}>
      <ChevronDoubleLeftIcon
        data-testid="chevron-double-left-element"
        className={cn(arrowVariants({ isDisabled: currentPage === 1 }))}
        onClick={handleClickStartPage}
      />
      <ChevronLeftIcon
        data-testid="chevron-left-element"
        className={cn(arrowVariants({ isDisabled: currentPage === 1 }))}
        onClick={handleClickPrev}
      />

      <NumberList
        pageRangeDisplayed={pageRangeDisplayed}
        onPageChange={handleClickPage}
        currentPage={currentPage}
        lastPage={lastPage}
        className="mx-2"
      />

      <ChevronRightIcon
        data-testid="chevron-double-right-element"
        className={cn(arrowVariants({ isDisabled: currentPage >= lastPage }))}
        onClick={handleClickNext}
      />
      <ChevronDoubleRightIcon
        data-testid="chevron-right-element"
        className={cn(arrowVariants({ isDisabled: currentPage >= lastPage }))}
        onClick={handleClickLastPage}
      />
    </nav>
  )
}

export { Pagination, arrowVariants }
