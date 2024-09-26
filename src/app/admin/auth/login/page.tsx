import GoogleIcon from '@/app/(main)/login/GoogleIcon';
import { auth, signIn } from '@/auth';
import { Button, Paper, Stack } from '@mantine/core';
import { redirect } from 'next/navigation';
import Logo from '../../base/Logo';

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    return redirect('/admin');
  }

  async function handleSignIn() {
    'use server';
    await signIn('google');
  }

  return (
    <Stack p={'md'} h={'100vh'} w={'100vw'} align={'center'} justify='center'>
      <Paper p={60} withBorder shadow='sm'>
        <Logo />
        <form action={handleSignIn}>
          <Stack mt={'lg'} align={'center'} justify={'center'}>
            <Button
              mt={'lg'}
              variant='default'
              type='submit'
              leftSection={<GoogleIcon />}
            >
              Continue with Google
            </Button>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
}
