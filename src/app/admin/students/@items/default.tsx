import { Button, Center } from '@mantine/core';
import React from 'react';
import Link from 'next/link';

export default function Default() {
  return (
    <Center h={'100%'}>
      <Button component={Link} href='.' variant='default'>
        Back
      </Button>
    </Center>
  );
}
