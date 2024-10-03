import { Box } from '@mantine/core';
import Form from '@admin/blocked-students/Form';
import { createBlockedStudent } from '../actions';

export default async function NewPage() {
  return (
    <Box p={'lg'}>
      <Form onSubmit={createBlockedStudent} />
    </Box>
  );
}
