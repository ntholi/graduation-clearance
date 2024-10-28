'use client';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { AppProgressBar } from 'next-nprogress-bar';
import React, { Suspense } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <ColorSchemeScript defaultColorScheme='dark' />
      <MantineProvider defaultColorScheme='dark'>
        <Notifications />
        <ModalsProvider>
          <SessionProvider>
            <QueryClientProvider client={queryClient}>
              <NuqsAdapter>{children}</NuqsAdapter>
            </QueryClientProvider>
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
