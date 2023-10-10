import React from 'react'
import { cn } from '@/utils'
import { HTMLMotionProps, motion } from 'framer-motion'

export interface DalogProps extends HTMLMotionProps<'div'> {
  isShow: boolean
  className?: string
  onClose?: () => void
}

const Dialog = React.forwardRef<HTMLDivElement, DalogProps>(
  ({ className, isShow, onClose = () => null, ...props }, ref) =>
    isShow && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.1 }}
          ref={ref}
          className="fixed inset-0 z-50 bg-black"
          onClick={onClose}
          data-testid="overlay-element"
        />
        <motion.div
          initial={{ scale: 0.5, x: '-50%', y: '-50%' }}
          animate={{ scale: 1, x: '-50%', y: '-50%' }}
          transition={{ duration: 0.1 }}
          className={cn(
            'fixed left-[50%] top-[50%] z-50 max-w-full rounded-lg bg-white p-6 shadow-lg',
            className
          )}
          {...props}
          data-testid="body-dialog-element"
        />
      </>
    )
)
Dialog.displayName = 'Dialog'

export { Dialog }
