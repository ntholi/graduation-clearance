import { auth } from '@/auth';
import { Stack, Title, Text, Anchor, Flex } from '@mantine/core';
import React, { Suspense } from 'react';

export default function AdminPage() {
  return (
    <Stack h={'70vh'} w={'100%'} justify='center' align='center'>
      <div>
        <Title fw={'lighter'}>Admin Panel</Title>
        <Suspense fallback={<Text>...</Text>}>
          <UserDisplay />
        </Suspense>
      </div>
    </Stack>
  );
}

async function UserDisplay() {
  const session = await auth();
  return (
    <Text size='sm' mt='xs'>
      Welcome, {session?.user?.name}
    </Text>
  );
}
