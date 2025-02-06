import type { ReactNode } from 'react'
import { cn } from '$/lib/utils'

interface ResponsiveValue<T> {
  'sm'?: T
  'md'?: T
  'lg'?: T
  'xl'?: T
  '2xl'?: T
}

interface StackProps {
  gap?: number | ResponsiveValue<number>
  direction?: 'row' | 'column' | ResponsiveValue<'row' | 'column'>
  padding?: number | ResponsiveValue<number>
  className?: string
  children: ReactNode
}

function generateResponsiveClasses<T,>(value: T | ResponsiveValue<T>, prefix: string, mapValueToClass: (value: T) => string): string {
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value)
      .map(([breakpoint, val]) => `${breakpoint}:${prefix}-${mapValueToClass(val)}`)
      .join(' ')
  }
  return `${prefix}-${mapValueToClass(value)}`
}

export const Stack: React.FC<StackProps> = ({
  gap = 0,
  direction = 'column',
  padding = 0,
  className,
  children,
}) => {
  // Gap
  const gapClass = generateResponsiveClasses(gap, 'gap', String)

  // Direction
  const directionClass = generateResponsiveClasses(direction, 'flex', val =>
    val === 'row' ? 'row' : 'col')

  // Padding
  const paddingClass = generateResponsiveClasses(padding, 'p', String)

  return (
    <div className={cn('flex', directionClass, gapClass, paddingClass, className)}>
      {children}
    </div>
  )
}
