import { auth, signOut } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Gradient from '@/components/ui/Gradient';
import { redirect } from 'next/navigation';
import Logo from '../student/base/Logo';
import { SignUpForm } from './form';
import { getStudentByUserId } from '@/app/(admin)/registry/students/actions';

export default async function RegistrationPage() {
  const session = await auth();
  const student = await getStudentByUserId(session?.user?.id);

  if (!session) return redirect('/login');

  if (student) return redirect('/');

  async function handleLogout() {
    'use server';
    await signOut();
  }

  return (
    <Gradient className='flex h-screen flex-col items-center justify-center p-4'>
      <Logo width={500} height={500} className='mx-auto block h-32 w-auto' />
      <Card className='w-full md:mt-10 md:w-[400px]'>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid w-full items-center gap-6'>
            <div className='flex justify-between'>
              <div className='flex items-center gap-3'>
                <Avatar>
                  <AvatarImage src={session?.user?.image ?? ''} />
                  <AvatarFallback>
                    {session?.user?.name
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <p className='font-semibold'>{session?.user?.name}</p>
                  <p className='text-xs text-muted-foreground'>
                    {session?.user?.email}
                  </p>
                </div>
              </div>
              <form action={handleLogout}>
                <Button variant='secondary' type='submit'>
                  Logout
                </Button>
              </form>
            </div>
            <SignUpForm />
          </div>
        </CardContent>
      </Card>
    </Gradient>
  );
}
