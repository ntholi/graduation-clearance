'use client';
import {
  MantineColorSchemeManager,
  MantineProvider,
  createTheme,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React, { Suspense } from 'react';
import { ModalsProvider } from '@mantine/modals';
import { AppProgressBar } from 'next-nprogress-bar';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
    breakpoints: {
      xl: '1538px',
    },
  });

  return (
    <Suspense>
      <MantineProvider forceColorScheme='dark' theme={theme}>
        <Notifications />
        <ModalsProvider>
          <SessionProvider>
            {children}
            <AppProgressBar
              height='3px'
              color='#2196F3'
              options={{ showSpinner: false }}
              shallowRouting
            />
          </SessionProvider>
        </ModalsProvider>
      </MantineProvider>
    </Suspense>
  );
}
