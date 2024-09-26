'use client';
import {
  AppShell,
  Burger,
  Flex,
  Group,
  LoadingOverlay,
  useComputedColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import Logo from './Logo';
import { ADMIN_ROLES } from '../auth/adminRoles';
import Navigation from './Navigation';

export default function AdminShell({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();
  const { status } = useSession();
  const colorScheme = useComputedColorScheme('dark');
  const { data: session } = useSession();
  const pathname = usePathname();

  const hasAccess = ADMIN_ROLES.includes(session?.user?.role || '');

  if (status == 'loading') {
    return (
      <Flex h='100vh' w='100vw' justify='center' align='center'>
        <LoadingOverlay visible />
      </Flex>
    );
  }

  if (!hasAccess && !pathname.startsWith('/admin/auth')) {
    return redirect('/admin/auth/access-denied');
  }

  if (pathname.startsWith('/admin/auth')) {
    return <>{children}</>;
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: hasAccess ? 300 : 0,
        breakpoint: 'md',
        collapsed: { mobile: !opened },
      }}
      padding='md'
    >
      <AppShell.Header>
        <Group h='100%' px='md' justify='space-between'>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom='md'
              size='sm'
            />
            <Logo />
          </Group>
        </Group>
      </AppShell.Header>
      {hasAccess && <Navigation />}
      <AppShell.Main bg={colorScheme === 'dark' ? 'dark.8' : 'gray.0'}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
