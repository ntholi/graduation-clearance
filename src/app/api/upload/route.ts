import { STUDENTS_FOLDER } from '@/lib/constants';
import googleDrive from '@/lib/google-drive';
import { drive_v3 } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

const uploadToGoogleDrive = async (_file: File) => {
  const drive = await googleDrive();

  const fileMetadata: drive_v3.Schema$File = {
    name: _file.name,
    parents: [STUDENTS_FOLDER],
  };

  const buffer = Buffer.from(await _file.arrayBuffer());
  const stream = Readable.from(buffer);

  const media = {
    mimeType: _file.type,
    body: stream,
  };
  const file = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
  });
  return file.data;
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const response = await uploadToGoogleDrive(file);
  return NextResponse.json(response);
}
