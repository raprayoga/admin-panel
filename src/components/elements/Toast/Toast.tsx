import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'
import { motion } from 'framer-motion'
import Card from '@/components/elements/Card'
import { XMarkIcon } from '@heroicons/react/24/outline'

const toastVariant = cva('pr-8 translate-x-[-50%]', {
  variants: {
    theme: {
      red: 'bg-red text-white',
      green: 'bg-green text-white',
      white: 'bg-white border border-gray text-gray',
    },
  },
  defaultVariants: {
    theme: 'red',
  },
})

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariant> {
  isShow: boolean
  onCLosed?: () => void
}

function Toast({
  className,
  theme = 'red',
  isShow = false,
  onCLosed = () => null,
  ...props
}: ToastProps) {
  return (
    isShow && (
      <motion.div
        className="fixed bottom-2 left-1/2 z-50"
        initial={{ opacity: 0, y: '10%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card
          className={cn(toastVariant({ theme }), className)}
          {...props}
          data-testid="toast-element"
        >
          {props.children}
          <XMarkIcon
            className="absolute right-2 top-1 w-5 cursor-pointer"
            onClick={() => onCLosed()}
          />
        </Card>
      </motion.div>
    )
  )
}

export { Toast }
