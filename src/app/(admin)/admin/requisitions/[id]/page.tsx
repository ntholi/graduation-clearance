import FieldView from '@/app/(admin)/components/FieldView';
import FileUploader from '@/app/(admin)/components/FileUploader';
import HeaderDisplay from '@/app/(admin)/components/HeaderDisplay';
import { STUDENTS_FOLDER } from '@/lib/constants';
import { formatDate } from '@/lib/format';
import googleDrive from '@/lib/google-drive';
import prisma from '@/lib/prisma';
import {
  Box,
  Group,
  Stack,
  Image,
  Text,
  Fieldset,
  SimpleGrid,
} from '@mantine/core';
import { drive_v3 } from 'googleapis';
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
        </Stack>

        <Fieldset legend='Documents' mt={'xl'}>
          <SimpleGrid cols={3}>
            <FileUploader
              onComplete={async () => {
                'use server';
                revalidatePath(`/admin/requisitions/${id}`);
              }}
            />
            <DriveFiles folderId={STUDENTS_FOLDER} />
          </SimpleGrid>
        </Fieldset>
      </Box>
    </Box>
  );
}

async function DriveFiles({ folderId }: { folderId: string }) {
  const drive = await googleDrive();
  const files = await drive.files.list({
    q: `'${folderId}' in parents`,
    fields: 'files(id, name, mimeType, thumbnailLink)',
  });
  return (
    <>
      {files?.data?.files?.map((file) => (
        <DisplayFile key={file.id} file={file} />
      ))}
    </>
  );
}

function DisplayFile({ file }: { file: drive_v3.Schema$File }) {
  return (
    <>
      <Image h={200} src={file.thumbnailLink} alt={file.name || ''} />
    </>
  );
}
