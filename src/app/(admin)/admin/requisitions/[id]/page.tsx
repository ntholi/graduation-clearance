import FieldView from '@/app/(admin)/components/FieldView';
import FileUploader from '@/app/(admin)/components/FileUploader';
import HeaderDisplay from '@/app/(admin)/components/HeaderDisplay';
import { formatDate } from '@/lib/format';
import prisma from '@/lib/prisma';
import { Box, Group, Stack } from '@mantine/core';
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
  });

  if (!item) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <HeaderDisplay title={item.title} />
      <Box p={'xl'}>
        <Group grow>
          <Stack>
            <FieldView label='Title' value={item.title} />
            <FieldView label='Status' value={item.description} />
            <FieldView label='Date' value={formatDate(item.date)} />
          </Stack>
          <Box>
            <FileUploader />
          </Box>
        </Group>
      </Box>
    </Box>
  );
}
