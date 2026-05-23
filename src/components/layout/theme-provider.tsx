'use client';

import { ReactNode } from 'react';

export interface ThemeProviderProps {
  children: ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  return <>{children}</>;
}
