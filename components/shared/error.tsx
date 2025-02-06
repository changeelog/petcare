import type { VariantProps } from 'class-variance-authority'
import { Link } from '$/components/shared/link'
import { cn } from '$/lib/utils'
import { cva } from 'class-variance-authority'
import { StopCircle } from 'lucide-react'
import React from 'react'

const errorVariants = cva(
  'inline-flex items-center gap-2 break-words text-red-900',
  {
    variants: {
      size: {
        sm: 'text-[13px] font-normal',
        md: 'text-sm font-normal',
        lg: 'text-base font-medium',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

interface ErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof errorVariants> {
  label?: string
  error?: {
    message: string
    action: string
    link: string
  }
}

function ErrorState({ ref, className, size = 'md', label, error, children, ...props }: ErrorProps & { ref: React.RefObject<HTMLParagraphElement> }) {
  return (
    <p
      ref={ref}
      className={cn(errorVariants({ size, className }))}
      {...props}
    >
      <StopCircle aria-hidden="true" className="size-4" />
      {error
        ? (
            <>
              <span>{error.message}</span>
              <span>
                <Link
                  href={error.link}
                  external={error.link.startsWith('https')}
                  className="font-medium underline underline-offset-4 hover:opacity-70"
                >
                  {error.action}
                </Link>
              </span>
            </>
          )
        : (
            <>
              {label && (
                <b>
                  {label}
                  :
                </b>
              )}
              {children}
            </>
          )}
    </p>
  )
}

ErrorState.displayName = 'Error'

export { ErrorState, errorVariants }
export type { ErrorProps }
