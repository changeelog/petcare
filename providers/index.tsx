import type { ThemeProviderProps } from 'next-themes'
import { Toaster } from '$/components/shared/sonner'
import { TooltipProvider } from '$/components/shared/tooltip'
import { ThemeProvider } from '$/providers/theme'

type DesignSystemProviderProperties = ThemeProviderProps

export function DesignSystemProvider({
  children,
  ...properties
}: Readonly<DesignSystemProviderProperties>) {
  return (
      <ThemeProvider {...properties}>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </ThemeProvider>
  )
}
