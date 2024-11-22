import HomeComponent from '@admin/components/HomeComponent';
import { Stack } from '@mantine/core';
import ExportAllButton from './ExportAllButton';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  return (
    <Stack align='center' justify='center' h='100%'>
      <HomeComponent title='Transcripts' />
      {session?.user?.role === 'admin' && <ExportAllButton />}
    </Stack>
  );
}
