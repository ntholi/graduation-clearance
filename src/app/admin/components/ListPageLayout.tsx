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
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import SearchField from './SearchField';

type Props = {
  children: React.ReactNode;
  items: React.ReactNode;
};

export default function ListPageLayout({ children, items }: Props) {
  return (
    <Grid columns={14} gutter={'xl'}>
      <GridCol span={4} pr={7}>
        <Paper withBorder h={'88vh'}>
          {items}
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
