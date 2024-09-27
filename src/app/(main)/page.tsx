import { auth } from '@/auth';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { ADMIN_ROLES } from '../admin/auth/adminRoles';

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

  if (!session?.user) return redirect('/login');

  if (session?.user?.role && ADMIN_ROLES.includes(session?.user?.role)) {
    return redirect('/admin');
  }
  if (session?.user?.role === 'student') {
    return redirect('/student');
  } else {
    return redirect('/signup');
  }
}
