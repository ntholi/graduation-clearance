import { Loader2 } from 'lucide-react';
import React from 'react';

export default function Loading() {
  return (
    <div className='flex w-full justify-center p-4'>
      <Loader2 className='size-5 animate-spin' />
    </div>
  );
}
