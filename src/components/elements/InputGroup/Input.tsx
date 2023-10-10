import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'

export const inputVariant = cva(
  'h-full w-full border rounded outline-0 focus:shadow-md py-2 placeholder:text-gray text-black px-2',
  {
    variants: {
      theme: {
        default: 'border-gray focus:shadow-gray',
        red: 'border-red focus:shadow-red',
        green: 'border-green focus:shadow-green',
      },
    },
    defaultVariants: {
      theme: 'red',
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariant> {
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, theme, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariant({ theme }), className)}
        ref={ref}
        {...props}
        data-testid="input-element"
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
