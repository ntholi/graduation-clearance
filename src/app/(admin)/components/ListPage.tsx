import React, { PropsWithChildren } from 'react';
import prisma from '@/lib/prisma';
import {
  Button,
  Divider,
  Flex,
  Grid,
  GridCol,
  NavLink,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import Link from 'next/link';
import SearchField from './SearchField';

type Props = {
  recourse: string;
  list: React.ReactNode;
  children: React.ReactNode;
};

export default function ListPage({ children, recourse, list }: Props) {
  return (
    <Grid columns={14} gutter={'xl'}>
      <GridCol span={{ base: 13, sm: 4 }} pr={{ base: 7, sm: 0 }}>
        <Paper withBorder>
          <Stack gap={0} w={'100%'}>
            <Flex p={'md'} justify='space-between'>
              <SearchField w={'72%'} />
              <Button
                variant='default'
                component={Link}
                href={`/${recourse}/new`}
              >
                New
              </Button>
            </Flex>
            <Divider />
            <ScrollArea h={{ base: 150, sm: '80vh' }} type='always' p={'sm'}>
              {list}
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
