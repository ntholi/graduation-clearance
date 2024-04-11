import StandardTitle from '@/app/(admin)/components/StandardTitle';
import { Stack } from '@mantine/core';
import React from 'react';

export default function NewPage() {
  return (
    <Stack p={'lg'}>
      <StandardTitle value={'New Requisition'} />
    </Stack>
  );
}
