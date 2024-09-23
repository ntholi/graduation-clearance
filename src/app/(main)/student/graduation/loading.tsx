import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Container from '@/components/ui/container';

export default function ClearancePageSkeleton() {
  return (
    <div className='min-h-screen bg-muted/20'>
      <Container className='pb-5'>
        <div className='mx-auto max-w-2xl'>
          <Skeleton className='mx-auto my-8 h-10 w-3/4' />
          <Skeleton className='mb-4 h-14 w-full' />

          {[...Array(4)].map((_, index) => (
            <div key={index} className='mb-8 flex'>
              <div className='mr-4 flex flex-col items-center'>
                <Skeleton className='h-14 w-14 rounded-full' />
                {index !== 3 && <Skeleton className='mt-2 h-20 w-0.5' />}
              </div>
              <div className='w-full'>
                <Skeleton className='h-32 w-full rounded-lg' />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
