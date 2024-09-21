import {
  ActionIcon,
  Divider,
  Flex,
  Group,
  Pagination,
  ScrollArea,
} from '@mantine/core';
import React from 'react';
import SearchField from './SearchField';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

type Props = {
  children: React.ReactNode;
};

export default function ItemsContainer({ children }: Props) {
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
      <Pagination total={2} value={1} size={'xs'} m={'sm'} />
    </Flex>
  );
}
