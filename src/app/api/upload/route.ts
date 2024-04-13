import { NextRequest, NextResponse } from 'next/server';
import { google, drive_v3 } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/auth';
import { Readable } from 'stream';
import { STUDENTS_FOLDER } from '@/lib/constants';
import googleDrive from '@/lib/google-drive';

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
  return file.data.id;
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  const response = await uploadToGoogleDrive(file);

  return NextResponse.json({ message: 'Files Created' });
}
