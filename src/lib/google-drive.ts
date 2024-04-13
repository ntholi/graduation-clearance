import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { google } from 'googleapis';
import { getServerSession } from 'next-auth';

/**
 * A helper function to create a Google Drive API instance
 *
 * @param session - NextAuth session
 * @returns Google Drive API instance
 */
const googleDrive = async () => {
  const session = await getServerSession(authOptions);
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session?.accessToken });

  return google.drive({ version: 'v3', auth: oauth2Client });
};

export default googleDrive;
