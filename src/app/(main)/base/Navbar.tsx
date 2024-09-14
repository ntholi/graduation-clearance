'use client';
import Container from '@/components/ui/container';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import UserButton from './UserButton';
import {
  getStudentByUserId,
  Student,
} from '@/app/(admin)/students/student-service';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    if (session?.user) {
      getStudentByUserId(session.user.id).then(setStudent);
    }
  }, [session?.user]);

  if (status === 'loading') return null;
  if (status === 'unauthenticated') return redirect('/login');

  if (!student) return redirect('/register');

  return (
    <nav className='border-b p-2'>
      <Container width='lg' className='flex items-center justify-between pb-0'>
        <div className='flex items-center'>
          <Link href='/'>
            <Logo className='mr-4 h-14 w-auto' />
          </Link>
        </div>
        <UserButton />
      </Container>
    </nav>
  );
}
