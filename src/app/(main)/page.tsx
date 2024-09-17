import { auth } from '@/auth';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const revalidate = 0;

export default function page() {
  return (
    <Suspense
      fallback={
        <div className='flex h-screen items-center justify-center'>
          <Loader2 className='h-10 w-10 animate-spin' />
        </div>
      }
    >
      <PageSwitch />
    </Suspense>
  );
}

async function PageSwitch() {
  const session = await auth();
  const staffRole = ['registry', 'finance', 'faculty', 'admin'];

  if (session?.user?.role && staffRole.includes(session?.user?.role)) {
    return redirect('/staff');
  }
  if (session?.user?.role === 'student') {
    return redirect('/student');
  }
  return (
    <div className='flex h-screen items-center justify-center'>
      <h1>
        Role is {session?.user?.role || 'unknown'} for{' '}
        {session?.user?.name || 'user'}
      </h1>
    </div>
  );
}
