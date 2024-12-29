import { AnalyticsProvider } from '@pc/analytics';
import { AuthProvider } from '@pc/auth/provider';
import { env } from '@pc/env';
import { VercelToolbar } from '@vercel/toolbar/next';
import type { ThemeProviderProps } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider } from './providers/theme';

type DesignSystemProviderProperties = ThemeProviderProps;

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
    <AuthProvider>
      <AnalyticsProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
        {env.NODE_ENV === 'development' && env.FLAGS_SECRET && (
          <VercelToolbar />
        )}
      </AnalyticsProvider>
    </AuthProvider>
  </ThemeProvider>
);
