import googleDrive from '@/lib/google-drive';
import {
  Fieldset,
  FieldsetProps,
  Image,
  Paper,
  SimpleGrid,
  Skeleton,
} from '@mantine/core';
import { Document } from '@prisma/client';
import { drive_v3 } from 'googleapis';
import Link from 'next/link';
import FileUploader from './FileUploader';
import { Suspense } from 'react';

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
    documents.map(async ({ driveId }) => {
      const { data } = await drive.files.get({
        fileId: driveId,
        fields: 'id, name, thumbnailLink, webViewLink',
      });
      return data;
    })
  );

  return (
    <>
      {files.map((file) => (
        <Link key={file.id} href={file.webViewLink ?? '#'} target='_blank'>
          <Paper withBorder h={200}>
            <Image
              h='100%'
              src={file.thumbnailLink}
              alt={''}
              fallbackSrc='/images/paper.png'
            />
          </Paper>
        </Link>
      ))}
    </>
  );
}

export default DriveFilesWrapper;
