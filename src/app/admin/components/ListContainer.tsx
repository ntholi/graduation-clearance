import { ActionIcon, Divider, Flex, Group, ScrollArea } from '@mantine/core';
import React from 'react';
import SearchField from './SearchField';
import Pagination from './Pagination';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

type Props = {
  children: (props: { path: string }) => React.ReactNode;
  total: number;
  path: string;
};

export default function ListContainer({ children, total, path }: Props) {
  return (
    <Flex direction='column' h='100%'>
      <Flex p={'md'} justify='space-between' align={'center'} gap={'xs'}>
        <Group grow>
          <SearchField style={{ width: '100%' }} />
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
        {children({ path })}
      </ScrollArea>
      <Divider />
      <Pagination total={total} path={path} />
    </Flex>
  );
}
