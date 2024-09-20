'use client';
import {
  ActionIcon,
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  NavLink,
  NavLinkProps,
  Pagination,
  Paper,
  ScrollArea,
  Stack,
} from '@mantine/core';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import SearchField from './SearchField';

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
      <GridCol span={4} pr={7}>
        <Paper withBorder h={'88vh'}>
          <Flex direction='column' h='100%'>
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
            <ScrollArea type='always' style={{ flex: 1 }} p={'sm'}>
              {nav.map((item) => (
                <NavLink
                  key={item.href}
                  component={Link}
                  {...item}
                  active={pathname === item.href}
                />
              ))}
            </ScrollArea>
            <Divider />
            <Pagination total={3} size={'xs'} m={'sm'} />
          </Flex>
        </Paper>
      </GridCol>
      <GridCol span={10}>
        <Paper withBorder>
          <ScrollArea h='88vh' type='always'>
            {children}
          </ScrollArea>
        </Paper>
      </GridCol>
    </Grid>
  );
}
