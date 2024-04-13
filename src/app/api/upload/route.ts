import { NextRequest, NextResponse } from 'next/server';
import { google, drive_v3 } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/auth';
import { Readable } from 'stream';

const uploadToGoogleDrive = async (_file: File, accessToken: string) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  const service = google.drive({ version: 'v3', auth: oauth2Client });

  const fileMetadata: drive_v3.Schema$File = {
    name: _file.name,
    parents: ['1uB57yjnOnksslvynfgCMIw0XiAHhj_6m'],
  };

  const buffer = Buffer.from(await _file.arrayBuffer());
  const stream = Readable.from(buffer);

  const media = {
    mimeType: _file.type,
    body: stream,
  };
  const file = await service.files.create({
    requestBody: fileMetadata,
    media: media,
  });
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
