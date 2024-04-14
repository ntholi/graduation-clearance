import DriveFiles from '@/app/(admin)/components/DriveFiles';
import FieldView from '@/app/(admin)/components/FieldView';
import HeaderDisplay from '@/app/(admin)/components/HeaderDisplay';
import { formatDate } from '@/lib/format';
import prisma from '@/lib/prisma';
import { Box, Stack } from '@mantine/core';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

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
    include: {
      documents: true,
    },
  });

  if (!item) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <HeaderDisplay title={item.title} />
      <Box p={'xl'}>
        <Stack>
          <FieldView label='Title' value={item.title} />
          <FieldView label='Status' value={item.description} />
          <FieldView label='Date' value={formatDate(item.date)} />
          <DriveFiles
            legend='Documents'
            mt={'xl'}
            documents={item.documents}
            onUpload={async (fileId, description) => {
              'use server';
              await prisma.document.create({
                data: {
                  driveId: fileId,
                  description,
                  requisitionId: id,
                },
              });
              revalidatePath(`/admin/requisitions/${id}`);
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}
