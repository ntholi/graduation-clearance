'use client';
import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  NavLink,
  NavLinkProps,
  Paper,
  ScrollArea,
  Stack,
} from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import SearchField from './SearchField';
import { PlusIcon } from 'lucide-react';

type NavItem = {
  href: string;
} & NavLinkProps;

type Props = {
  path: string;
  nav: NavItem[];
  includeNewLink?: boolean;
  children: React.ReactNode;
  actionIcons?: React.ReactNode[];
};

export default function ListPage({
  children,
  path,
  nav,
  includeNewLink = true,
  actionIcons,
}: Props) {
  const pathname = usePathname();
  return (
    <Grid columns={14} gutter={'xl'}>
      <GridCol span={{ base: 13, sm: 4 }} pr={{ base: 7, sm: 0 }}>
        <Paper withBorder>
          <Stack gap={0} w={'100%'}>
            <Flex p={'md'} justify='space-between' align={'center'} gap={'xs'}>
              <Group grow>
                <SearchField style={{ width: '100%' }} />
              </Group>
              {includeNewLink && (
                <ActionIcon
                  variant='default'
                  component={Link}
                  size={'lg'}
                  href={`/${path}/new`}
                >
                  <PlusIcon size={'1rem'} />
                </ActionIcon>
              )}
              {actionIcons}
            </Flex>
            <Divider />
            <ScrollArea h={{ base: 150, sm: '80vh' }} type='always' p={'sm'}>
              {nav.map((item) => (
                <NavLink
                  key={item.href}
                  component={Link}
                  {...item}
                  active={pathname === item.href}
                />
              ))}
            </ScrollArea>
          </Stack>
        </Paper>
      </GridCol>
      <GridCol span={{ base: 13, sm: 10 }}>
        <Paper withBorder>
          <ScrollArea h='88.5vh' type='always'>
            {children}
          </ScrollArea>
        </Paper>
      </GridCol>
    </Grid>
  );
}
