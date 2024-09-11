'use client';
import { useState } from 'react';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';
import Container from '@/components/ui/container';
import Link from 'next/link';
import UserButton from './UserButton';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='border-b p-2'>
      <Container width='lg' className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Logo className='mr-4 h-14 w-auto' />
          <div className='hidden space-x-4 md:flex'>
            <Link href='/' className='hover:text-foreground/60'>
              Transcripts
            </Link>
          </div>
        </div>
        <div className='hidden md:block'>
          <UserButton />
        </div>
        <div className='md:hidden'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-foreground focus:outline-none'
          >
            {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
      </Container>
      {isOpen && (
        <div className='absolute left-0 top-20 z-50 h-full w-full bg-background/30 backdrop-blur-md md:hidden'>
          <div className='space-y-3 px-2 pb-3 pt-2'>
            <Link href='/' className='block text-lg hover:text-foreground/60'>
              Transcripts
            </Link>
            <UserButton />
          </div>
        </div>
      )}
    </nav>
  );
}
