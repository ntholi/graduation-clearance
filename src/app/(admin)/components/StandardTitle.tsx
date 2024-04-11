import { Divider, Title } from '@mantine/core';
import React from 'react';

type Props = {
  value: string;
};

export default function StandardTitle({ value }: Props) {
  return (
    <>
      <Title order={3} fw={100}>
        {value}
      </Title>
      <Divider mt={'md'} />
    </>
  );
}
