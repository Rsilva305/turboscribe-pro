'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

// Define a simplified version of props since the original type isn't available
type ThemeProviderProps = {
  children: React.ReactNode;
  [key: string]: any;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // @ts-ignore - Ignoring type mismatch
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
} 