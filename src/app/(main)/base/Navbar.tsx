'use client';
import Container from '@/components/ui/container';
import Logo from './Logo';
import UserButton from './UserButton';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='border-b p-2'>
      <Container width='lg' className='flex items-center justify-between'>
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
