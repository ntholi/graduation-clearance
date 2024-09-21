import { ActionIcon, Divider, Flex, Group, ScrollArea } from '@mantine/core';
import React from 'react';
import SearchField from './SearchField';
import Pagination from './Pagination';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

type Props = {
  children: React.ReactNode;
  total: number;
};

export default function ItemsContainer({ children, total }: Props) {
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
          href={`/admin/graduating-students/new`}
        >
          <PlusIcon size={'1rem'} />
        </ActionIcon>
      </Flex>
      <Divider />
      <ScrollArea type='always' style={{ flex: 1 }} p={'sm'}>
        {children}
      </ScrollArea>
      <Divider />
      <Pagination total={total} />
    </Flex>
  );
}
