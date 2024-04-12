import { Box } from '@mantine/core';
import Form from './Form';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { revalidatePath } from 'next/cache';

export default async function NewPage() {
  const session = await getServerSession(authOptions);
  return (
    <Box p={'lg'}>
      <Form
        onSubmit={async (value) => {
          'use server';
          const res = await prisma.requisition.create({
            data: { ...value, userId: session!.user!.id },
          });
          revalidatePath('/admin/requisitions');
          return res;
        }}
      />
    </Box>
  );
}
