import { Box } from '@mantine/core';
import Form from '../Form';
import { createGraduatingStudent } from '../actions';

export default async function NewPage() {
  return (
    <Box p={'lg'}>
      <Form onSubmit={createGraduatingStudent} />
    </Box>
  );
}
