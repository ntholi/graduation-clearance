import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/auth';
import { Readable } from 'stream';

const uploadToGoogleDrive = async (_file: File, accessToken: string) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  const service = google.drive({ version: 'v3', auth: oauth2Client });
  const requestBody = {
    name: 'photo.jpg',
    fields: 'id',
  };

  const buffer = Buffer.from(await _file.arrayBuffer());
  const stream = Readable.from(buffer);

  const media = {
    mimeType: 'image/jpeg',
    body: stream,
  };
  const file = await service.files.create({
    requestBody,
    media: media,
  });
  console.log('Uploaded:', file.data);
  return file.data.id;
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const formData = await req.formData();
  const file = formData.get('file') as File;

  const response = await uploadToGoogleDrive(
    file,
    session?.accessToken as string
  );

  return NextResponse.json({ message: 'Files Created' });
}
