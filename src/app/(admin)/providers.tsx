'use client';
import { MantineProvider } from '@mantine/core';
import { SessionProvider } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';

export function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <MantineProvider>
      <SessionProvider>{children}</SessionProvider>;
    </MantineProvider>
  );
}
