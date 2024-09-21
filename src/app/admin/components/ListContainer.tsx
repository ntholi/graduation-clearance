import { ActionIcon, Divider, Flex, Group, ScrollArea } from '@mantine/core';
import React from 'react';
import SearchField from './SearchField';
import Pagination from './Pagination';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

type Props<T> = {
  children: (props: { item: T; path: string }) => React.ReactNode;
  total: number;
  items: T[];
  path: string;
};

export default function ListContainer<T>({
  children,
  total,
  path,
  items,
}: Props<T>) {
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
          <React.Fragment key={index}>
            {children({ item, path })}
          </React.Fragment>
        ))}
      </ScrollArea>

      <Divider />
      <Pagination total={total} path={path} />
    </Flex>
  );
}
