import type { VariantProps } from 'class-variance-authority'
import { cn } from '$/lib/utils'
import { cva } from 'class-variance-authority'
import React from 'react'

const emptyStateVariants = cva('grid place-items-center gap-4 text-gray-900', {
  variants: {
    variant: {},
  },
  defaultVariants: {},
})

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof emptyStateVariants> {
  title: string
  description: string
  icon?: React.ElementType
  iconSize?: number
}

function EmptyState({ ref, className, variant, title, description, icon: Icon, iconSize = 32, children, ...props }: EmptyStateProps & { ref: React.RefObject<HTMLDivElement> }) {
  const iconParentSize = iconSize ? iconSize + 28 : 32

  return (
    <div
      ref={ref}
      className={cn(emptyStateVariants({ variant, className }))}
      {...props}
    >
      {Icon && (
        <span
          className="grid place-items-center rounded-lg border border-gray-alpha-400 bg-background-100 p-[14px]"
          style={{
            width: `${iconParentSize}px`,
            height: `${iconParentSize}px`,
          }}
        >
          <Icon aria-hidden="true" width={iconSize} height={iconSize} />
        </span>
      )}
      <div className="grid place-items-center gap-2">
        <p className="text-lg font-medium text-gray-1000">{title}</p>
        <p className="text-balance text-sm">{description}</p>
      </div>
      {children}
    </div>
  )
}

EmptyState.displayName = 'EmptyState'

export { EmptyState, emptyStateVariants }
