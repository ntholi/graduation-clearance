import FieldView from '@/app/(admin)/components/FieldView';
import FileUploader from '@/app/(admin)/components/FileUploader';
import HeaderDisplay from '@/app/(admin)/components/HeaderDisplay';
import { STUDENTS_FOLDER } from '@/lib/constants';
import { formatDate } from '@/lib/format';
import googleDrive from '@/lib/google-drive';
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
            <DriveFiles folderId={STUDENTS_FOLDER} />
          </Box>
        </Group>
      </Box>
    </Box>
  );
}

/**
 * Displays a list of files from Google Drive from the specific folder.
 */
async function DriveFiles({ folderId }: { folderId: string }) {
  const drive = await googleDrive();
  const files = await drive.files.list({
    q: `'${folderId}' in parents`,
  });
  return (
    <Box>
      {files?.data?.files?.map((file) => (
        <Box key={file.id}>{file.name}</Box>
      ))}
    </Box>
  );
}
