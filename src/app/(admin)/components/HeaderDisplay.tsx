'use client';
import { ActionIcon, Button, Divider, Flex, Title } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type props = {
  title: string;
};
export default function HeaderDisplay({ title }: props) {
  const pathname = usePathname();
  return (
    <>
      <Flex justify={'space-between'} align={'center'}>
        <Title order={3} fw={100}>
          {title}
        </Title>
        <ActionIcon
          component={Link}
          size={'lg'}
          href={`${pathname}/edit`}
          variant='default'
        >
          <IconEdit size={'1.1rem'} />
        </ActionIcon>
      </Flex>
      <Divider my={15} />
    </>
  );
}
