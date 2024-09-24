'use client';
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import { AppProgressBar } from 'next-nprogress-bar';
import React, { Suspense } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
    breakpoints: {
      xl: '1538px',
    },
  });

  return (
    <Suspense>
      <ColorSchemeScript defaultColorScheme='dark' />
      <MantineProvider defaultColorScheme='dark'>
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
