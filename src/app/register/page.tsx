import { auth, signOut } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Gradient from '@/components/ui/Gradient';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect } from 'next/navigation';
import Logo from '../(main)/base/Logo';

export default async function RegistrationPage() {
  const session = await auth();

  if (!session) return redirect('/login');

  async function handleLogout() {
    'use server';
    await signOut();
  }

  return (
    <Gradient className='flex h-screen items-center justify-center p-4'>
      <Logo
        width={500}
        height={500}
        className='absolute left-1/2 top-0 mt-4 h-32 w-auto -translate-x-1/2 md:mt-10'
      />
      <Card className='w-full md:mt-10 md:w-[400px]'>
        <CardHeader>
          <CardTitle>Register</CardTitle>
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
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' placeholder='Full Names' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='studentNumber'>Student Number</Label>
              <Input id='studentNumber' placeholder='Student Number' />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className='w-full'>Register</Button>
        </CardFooter>
      </Card>
    </Gradient>
  );
}
