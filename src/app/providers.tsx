'use client';

import { ThemeProvider } from '@/components/theme/theme-provider';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    mounted && (
      <ThemeProvider
        attribute='class'
        defaultTheme='dark'
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    )
  );
}
