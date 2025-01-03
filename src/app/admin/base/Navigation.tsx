'use client';
import {
  ActionIcon,
  AppShell,
  Avatar,
  Divider,
  Flex,
  Group,
  Indicator,
  NavLink,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { useQuery } from '@tanstack/react-query';
import {
  Cctv,
  ChartGantt,
  ChevronRight,
  Computer,
  Construction,
  FileText,
  GraduationCap,
  HandCoins,
  Landmark,
  LibraryBig,
  ListCheck,
  LogOutIcon,
  SquareCheck,
  UserIcon,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import {
  getUnattendedRequestsCount,
  Responder,
} from '../clearance-requests/actions';

export default function Navigation() {
  const pathname = usePathname();

  const { data: session } = useSession();
  const { data: pending } = useQuery({
    queryKey: ['unattended-requests'],
    queryFn: () => getUnattendedRequestsCount(session?.user?.role as Responder),
    refetchInterval: 5 * 60 * 1000,
    enabled: !!session?.user?.role,
  });

  const isRegistry =
    session?.user?.role === 'registry' || session?.user?.role === 'admin';
  const isFinance =
    session?.user?.role === 'finance' || session?.user?.role === 'admin';
  const isLibrary =
    session?.user?.role === 'library' || session?.user?.role === 'admin';
  const isIT = session?.user?.role === 'it' || session?.user?.role === 'admin';
  const isResource =
    session?.user?.role === 'resource' || session?.user?.role === 'admin';

  return (
    <AppShell.Navbar p='xs'>
      <AppShell.Section grow component={ScrollArea}>
        {isRegistry && (
          <>
            <NavLink
              label='Students'
              component={Link}
              active={pathname.startsWith('/admin/students')}
              href={'/admin/students'}
              leftSection={<UserIcon size='1.1rem' />}
              rightSection={<ChevronRight size='0.8rem' strokeWidth={1.5} />}
            />
            <NavLink
              label='Graduating Students'
              component={Link}
              active={pathname.startsWith('/admin/graduating/students')}
              href={'/admin/graduating/students'}
              leftSection={<GraduationCap size='1.1rem' />}
              rightSection={<ChevronRight size='0.8rem' strokeWidth={1.5} />}
            />
          </>
        )}
        {(isLibrary || isIT || isResource || isFinance) && (
          <>
            <NotificationIndicator label={pending}>
              <NavLink
                label='Clearance Requests'
                component={Link}
                active={pathname.startsWith('/admin/clearance-requests')}
                href={'/admin/clearance-requests'}
                leftSection={<ListCheck size='1.1rem' />}
                rightSection={<ChevronRight size='0.8rem' strokeWidth={1.5} />}
              />
            </NotificationIndicator>
            <NavLink
              label='Blocked Students'
              leftSection={<Construction size={'1rem'} />}
            >
              {isFinance && (
                <NavLink
                  label='Finance'
                  component={Link}
                  active={pathname.startsWith(
                    '/admin/blocked-students/finance',
                  )}
                  href={'/admin/blocked-students/finance'}
                  leftSection={<Landmark size='1.1rem' />}
                  rightSection={
                    <ChevronRight size='0.8rem' strokeWidth={1.5} />
                  }
                />
              )}
              {isLibrary && (
                <NavLink
                  label='Library'
                  component={Link}
                  active={pathname.startsWith(
                    '/admin/blocked-students/library',
                  )}
                  href={'/admin/blocked-students/library'}
                  leftSection={<LibraryBig size='1.1rem' />}
                  rightSection={
                    <ChevronRight size='0.8rem' strokeWidth={1.5} />
                  }
                />
              )}
              {isIT && (
                <NavLink
                  label='IT'
                  component={Link}
                  active={pathname.startsWith('/admin/blocked-students/it')}
                  href={'/admin/blocked-students/it'}
                  leftSection={<Computer size='1.1rem' />}
                  rightSection={
                    <ChevronRight size='0.8rem' strokeWidth={1.5} />
                  }
                />
              )}
              {isResource && (
                <NavLink
                  label='Resource'
                  component={Link}
                  active={pathname.startsWith(
                    '/admin/blocked-students/resource',
                  )}
                  href={'/admin/blocked-students/resource'}
                  leftSection={<Cctv size='1.1rem' />}
                  rightSection={
                    <ChevronRight size='0.8rem' strokeWidth={1.5} />
                  }
                />
              )}
            </NavLink>
          </>
        )}
        {isFinance && (
          <NavLink
            label='Payments'
            component={Link}
            active={pathname.startsWith('/admin/payments')}
            href={'/admin/payments'}
            leftSection={<HandCoins size='1.1rem' />}
            rightSection={<ChevronRight size='0.8rem' strokeWidth={1.5} />}
          />
        )}
        {isRegistry && (
          <NavLink
            label='Transcripts'
            component={Link}
            href={'/admin/transcripts'}
            leftSection={<FileText size='1.1rem' />}
            rightSection={<ChevronRight size='0.8rem' strokeWidth={1.5} />}
          />
        )}
        <NavLink
          label='Reports'
          opened
          leftSection={<ChartGantt size={'1rem'} />}
        >
          <NavLink
            label='Cleared Students'
            component={Link}
            active={pathname.startsWith('/admin/reports/cleared-students')}
            href={'/admin/reports/cleared-students'}
            leftSection={<SquareCheck size='1.1rem' />}
            rightSection={<ChevronRight size='0.8rem' strokeWidth={1.5} />}
          />
          <NavLink
            label='Blocked Students'
            component={Link}
            active={pathname.startsWith('/admin/reports/blocked-students')}
            href={'/admin/reports/blocked-students'}
            leftSection={<Construction size='1.1rem' />}
            rightSection={<ChevronRight size='0.8rem' strokeWidth={1.5} />}
          />
        </NavLink>
      </AppShell.Section>
      <AppShell.Section>
        <Divider />
        <UserButton />
      </AppShell.Section>
    </AppShell.Navbar>
  );
}

function UserButton() {
  const { data: session } = useSession();

  const openModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: 'Confirm logout',
      children: 'Are you sure you want to logout?',
      confirmProps: { color: 'dark' },
      labels: { confirm: 'Logout', cancel: 'Cancel' },
      onConfirm: async () => await signOut(),
    });

  return (
    <Flex mt={'md'} mb={'sm'} justify='space-between' align={'center'}>
      <Group>
        <Avatar src={session?.user?.image} />
        <Stack gap={5}>
          <Text size='0.9rem'>{session?.user?.name}</Text>
          <Text size='0.7rem' c={'dimmed'}>
            {session?.user?.email}
          </Text>
        </Stack>
      </Group>
      <ActionIcon variant='default' size={'lg'}>
        <LogOutIcon size='1rem' onClick={openModal} />
      </ActionIcon>
    </Flex>
  );
}

function NotificationIndicator({
  children,
  label,
}: PropsWithChildren<{ label: React.ReactNode }>) {
  return (
    <Indicator
      position='middle-end'
      color='red'
      offset={20}
      size={23}
      label={label}
      disabled={!label}
    >
      {children}
    </Indicator>
  );
}
