import StandardTitle from '@/app/(admin)/components/StandardTitle';
import { Box, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import Form from './Form';

export default function NewPage() {
  return (
    <Box p={'lg'}>
      <StandardTitle value={'New Requisition'} />
      <Form />
    </Box>
  );
}
