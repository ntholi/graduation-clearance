import { auth, signOut } from '@/auth';
import { Anchor, Button, Stack, Text, Title } from '@mantine/core';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ADMIN_ROLES } from '../adminRoles';

export default async function AccessDenied() {
  const session = await auth();

  async function handleSignOut() {
    'use server';
    await signOut();
  }

  if (!session) {
    return redirect('/admin/auth/login');
  }
  const hasAccess = ADMIN_ROLES.includes(session?.user?.role || '');
  if (hasAccess) {
    return redirect('/admin/students');
  }

  return (
    <Stack align='center' justify='center' h={'80vh'}>
      <div>
        <ShieldAlert className='text-red-500' size={100} />
      </div>
      <Title>Access Denied</Title>
      <form action={handleSignOut}>
        <Text>
          You are logged in as {session?.user?.name || 'Unknown User'},{' '}
          <Anchor component='button'>Sign Out</Anchor>
        </Text>
      </form>
      <Button component={Link} href={'/'}>
        Home Page
      </Button>
    </Stack>
  );
}
