import { Box } from '@mantine/core';
import Form from './Form';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export default async function NewPage() {
  const session = await getServerSession(authOptions);
  return (
    <Box p={'lg'}>
      <Form
        onSubmit={async (value) => {
          'use server';
          const { items, ...data } = value;
          const res = await prisma.requisition.create({
            data: {
              ...data,
              items: {
                create: items,
              },
              userId: session!.user!.id,
            },
          });
          revalidatePath('/admin/requisitions');
          return res;
        }}
      />
    </Box>
  );
}
