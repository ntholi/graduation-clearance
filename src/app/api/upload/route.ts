import googleDrive from '@/lib/google-drive';
import { drive_v3 } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

async function createFolderIfNotExists(drive: drive_v3.Drive, folder: string) {
  const res = await drive.files.list({
    q: `mimeType='application/vnd.google-apps.folder' and name='${folder}'`,
  });
  if (res.data.files?.length) {
    return res.data.files[0].id;
  }

  const folderMetadata: drive_v3.Schema$File = {
    name: folder,
    mimeType: 'application/vnd.google-apps.folder',
  };
  const folderRes = await drive.files.create({
    requestBody: folderMetadata,
  });
  return folderRes.data.id;
}

const uploadToGoogleDrive = async (folder: string, file: File) => {
  const drive = await googleDrive();

  const folderId = await createFolderIfNotExists(drive, folder);
  const fileMetadata: drive_v3.Schema$File = {
    name: file.name,
    parents: folderId ? [folderId] : null,
  };

  const buffer = Buffer.from(await file.arrayBuffer());
  const stream = Readable.from(buffer);

  const media = {
    mimeType: file.type,
    body: stream,
  };
  const res = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
  });
  return res.data;
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const folder = formData.get('folder') as string;

  const response = await uploadToGoogleDrive(folder, file);
  return NextResponse.json(response);
}
