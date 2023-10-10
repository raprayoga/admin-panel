import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'

const cardVariants = cva('rounded-lg', {
  variants: {
    theme: {
      white: 'bg-white border border-gray',
      green: 'bg-green shadow shadow-green  text-white',
      red: 'bg-red shadow shadow-red text-white',
    },
    size: {
      small: 'p-3',
      large: 'p-4',
    },
  },
  defaultVariants: {
    theme: 'white',
    size: 'small',
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, theme, size, ...props }, ref) => (
    <div
      data-testid="card-element"
      ref={ref}
      className={cn(cardVariants({ theme, size }), className)}
      {...props}
    />
  )
)
Card.displayName = 'Card'

export { Card }
