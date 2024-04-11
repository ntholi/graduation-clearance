import { Stack } from '@mantine/core';
import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import FieldView from '@/app/(admin)/components/FieldView';

type Props = {
  params: {
    id: string;
  };
};
export default async function Page({ params: { id } }: Props) {
  const item = await prisma.requisition.findUnique({
    where: {
      id,
    },
  });

  if (!item) {
    return notFound();
  }

  return (
    <Stack p={'xl'}>
      <FieldView label='Title' value={item.title} />
    </Stack>
  );
}
