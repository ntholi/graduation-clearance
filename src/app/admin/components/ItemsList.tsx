import React from 'react';
import { ActionIcon, Divider, Flex, Group, ScrollArea } from '@mantine/core';
import SearchField from './SearchField';
import Pagination from './Pagination';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

type Props<T> = {
  getItems: (
    page: number,
    search: string,
  ) => Promise<{ items: T[]; pages: number }>;
  path: string;
  renderItem: (item: T, path: string) => React.ReactNode;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ItemsList<T>({
  getItems,
  path,
  renderItem,
  searchParams,
}: Props<T>) {
  const { items, pages } = await getItems(
    Number(searchParams?.page),
    searchParams?.search as string,
  );

  return (
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
      </Flex>
      <Divider />
      <ScrollArea type='always' style={{ flex: 1 }} p={'sm'}>
        {items.map((item: T, index: number) => (
          <React.Fragment key={index}>{renderItem(item, path)}</React.Fragment>
        ))}
      </ScrollArea>

      <Divider />
      <Pagination total={pages} path={path} />
    </Flex>
  );
}
