import { Box, Paper } from '@mantine/core';
import Form from '../Form';
import { createPayment } from '../actions';

export default async function NewPage() {
  return (
    <Box p={'lg'}>
      <Paper p={'lg'}>
        <Form onSubmit={createPayment} />
      </Paper>
    </Box>
  );
}
