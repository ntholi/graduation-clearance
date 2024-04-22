import { Box, Stack, Title, Text } from '@mantine/core';
import React from 'react';

export default async function RequisitionPage() {
  return (
    <Stack align='center' gap={5} justify='center' mt='30vh'>
      <div>
        <Title fw={400} c='gray'>
          Student Cards
        </Title>
        <Text pl={3} c='gray' size='xs'>
          Nothing Selected
        </Text>
      </div>
    </Stack>
  );
}
