import googleDrive from '@/lib/google-drive';
import {
  Fieldset,
  FieldsetProps,
  Image,
  Paper,
  SimpleGrid,
  Skeleton,
  Text,
  rgba,
} from '@mantine/core';
import { Document } from '@prisma/client';
import Link from 'next/link';
import { Suspense } from 'react';
import FileUploader from './FileUploader';

type Props = {
  documents: Document[];
  onUpload: (fileId: string, description: string) => void;
} & FieldsetProps;

async function DriveFilesWrapper({ documents, onUpload, ...props }: Props) {
  return (
    <Fieldset {...props}>
      <SimpleGrid cols={3}>
        <Suspense fallback={<Loader />}>
          <FileUploader onComplete={onUpload} />
          <DriveFiles documents={documents} onUpload={onUpload} {...props} />
        </Suspense>
      </SimpleGrid>
    </Fieldset>
  );
}

function Loader() {
  return (
    <>
      <Skeleton height={200} />
      <Skeleton height={200} />
    </>
  );
}

async function DriveFiles({ documents, onUpload, ...props }: Props) {
  const drive = await googleDrive();
  const files = await Promise.all(
    documents.map(async ({ driveId, description }) => {
      const { data } = await drive.files.get({
        fileId: driveId,
        fields: 'id, name, thumbnailLink, webViewLink',
      });
      return { description, ...data };
    })
  );

  return (
    <>
      {files.map((file) => (
        <Link key={file.id} href={file.webViewLink ?? '#'} target='_blank'>
          <Paper withBorder h={200} pos={'relative'}>
            <Image
              h='100%'
              src={file.thumbnailLink}
              alt={''}
              fallbackSrc='/images/paper.png'
            />
            <Text
              pos={'absolute'}
              bottom={0}
              ta={'center'}
              w={'100%'}
              bg={rgba('dark', 0.7)}
              p={5}
              size='sm'
              c={'gray'}
            >
              {file.description || 'Document'}
            </Text>
          </Paper>
        </Link>
      ))}
    </>
  );
}

export default DriveFilesWrapper;
