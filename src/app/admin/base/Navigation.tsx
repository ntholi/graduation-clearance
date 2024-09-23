import {
  ActionIcon,
  AppShell,
  Avatar,
  Divider,
  Flex,
  Group,
  NavLink,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  ChevronRight,
  LogOutIcon,
  UserIcon,
  Landmark,
  Construction,
  LibraryBig,
  Computer,
  Cctv,
  Coins,
  GraduationCap,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  return (
    <AppShell.Navbar p='xs'>
      <AppShell.Section grow component={ScrollArea}>
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
          active={pathname.startsWith('/admin/graduating-students')}
          href={'/admin/graduating-students'}
          leftSection={<GraduationCap size='1.1rem' />}
          rightSection={<ChevronRight size='0.8rem' strokeWidth={1.5} />}
        />
        <NavLink
          label='Finance Clearance'
          component={Link}
          active={pathname.startsWith('/admin/finance-clearance')}
          href={'/admin/finance-clearance'}
          leftSection={<Landmark size='1.1rem' />}
          rightSection={<ChevronRight size='0.8rem' strokeWidth={1.5} />}
        />
        <NavLink
          label='Blocked Students'
          leftSection={<Construction size={'1rem'} />}
        >
          <NavLink
            label='Finance'
            component={Link}
            active={pathname.startsWith('/admin/blocked-students/finance')}
            href={'/admin/blocked-students/finance'}
            leftSection={<Landmark size='1.1rem' />}
            rightSection={<ChevronRight size='0.8rem' strokeWidth={1.5} />}
          />
          <NavLink
            label='Library'
            component={Link}
            active={pathname.startsWith('/admin/blocked-students/library')}
            href={'/admin/blocked-students/library'}
            leftSection={<LibraryBig size='1.1rem' />}
            rightSection={<ChevronRight size='0.8rem' strokeWidth={1.5} />}
          />
          <NavLink
            label='IT'
            component={Link}
            active={pathname.startsWith('/admin/blocked-students/it')}
            href={'/admin/blocked-students/it'}
            leftSection={<Computer size='1.1rem' />}
            rightSection={<ChevronRight size='0.8rem' strokeWidth={1.5} />}
          />
          <NavLink
            label='Resource'
            component={Link}
            active={pathname.startsWith('/admin/blocked-students/resource')}
            href={'/admin/blocked-students/resource'}
            leftSection={<Cctv size='1.1rem' />}
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
      onConfirm: () => signOut(),
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
