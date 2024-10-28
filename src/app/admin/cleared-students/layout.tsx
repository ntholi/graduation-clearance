'use client';
import { Box } from '@mantine/core';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <Box p='xl'>{children}</Box>;
}
