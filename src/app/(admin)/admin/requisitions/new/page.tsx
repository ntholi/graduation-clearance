import { Box } from '@mantine/core';
import Form from './Form';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export default async function NewPage() {
  const session = await getServerSession(authOptions);
  return (
    <Box p={'lg'}>
      <Form
        onSubmit={async (value) => {
          'use server';
          await new Promise((resolve) => setTimeout(resolve, 3000));
          // await prisma.requisition.create({
          //   data: { ...value, userId: session!.user!.id },
          // });
        }}
      />
    </Box>
  );
}
