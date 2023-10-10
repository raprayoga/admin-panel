import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const inputVariant = cva(
  'h-full w-full border rounded outline-0 py-2 placeholder:opacity-0 text-black px-2 outline-none focus:shadow-sm',
  {
    variants: {
      theme: {
        default: 'border-gray focus:shadow-primary',
        red: 'border-red focus:shadow-red',
        green: 'border-green focus:shadow-green',
      },
    },
    defaultVariants: {
      theme: 'default',
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof inputVariant> {}

const Select = forwardRef<HTMLSelectElement, InputProps>(
  ({ theme, className, ...props }, ref) => {
    return (
      <select
        className={cn(inputVariant({ theme }), className)}
        data-testid="select-element"
        ref={ref}
        {...props}
      />
    )
  }
)
Select.displayName = 'Select'

export { Select }
