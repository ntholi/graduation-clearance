'use client';
import {
  ActionIcon,
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  Pagination,
  Paper,
  ScrollArea,
} from '@mantine/core';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SearchField from './SearchField';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

type Props<T> = {
  getItems: (
    page: number,
    search: string,
  ) => Promise<{ items: T[]; pages: number }>;
  path: string;
  renderItem: (item: T, path: string) => React.ReactNode;
  actionIcons?: React.ReactNode[];
  children: React.ReactNode;
};

export default function ListLayout<T>({
  getItems,
  path,
  renderItem,
  actionIcons,
  children,
}: Props<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [pages, setPages] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const fetchItems = async () => {
      const result = await getItems(page, search);
      setItems(result.items);
      setPages(result.pages);
    };

    fetchItems();
  }, [getItems, page, search]);
  return (
    <Grid columns={14} gutter={'xl'}>
      <GridCol span={4} pr={7}>
        <Paper withBorder h={'88vh'}>
          <Flex direction='column' h='100%'>
            <Flex p={'md'} justify='space-between' align={'center'} gap={'xs'}>
              <Group style={{ width: '100%', flex: 1 }}>
                <SearchField path={path} style={{ width: '100%' }} />
              </Group>

              <ActionIcon
                variant='default'
                component={Link}
                size={'lg'}
                href={`${path}/new`}
              >
                <PlusIcon size={'1rem'} />
              </ActionIcon>
              {actionIcons?.map((component, index) => (
                <React.Fragment key={index}>{component}</React.Fragment>
              ))}
            </Flex>
            <Divider />
            <ScrollArea type='always' style={{ flex: 1 }} p={'sm'}>
              {items.map((item: T, index: number) => (
                <React.Fragment key={index}>
                  {renderItem(item, path)}
                </React.Fragment>
              ))}
            </ScrollArea>

            <Divider />
            <Pagination total={pages} path={path} />
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
