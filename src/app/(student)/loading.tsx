import React from 'react';
import Container from '@/components/ui/container';
import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingPage() {
  return (
    <Container className='mx-auto mt-10 max-w-4xl'>
      <div className='mb-10 rounded-lg bg-gradient-to-r from-blue-950/60 to-purple-950/30 p-8 text-white shadow dark:from-blue-500/5 dark:to-purple-600/5'>
        <div className='flex flex-col items-center gap-2 text-center'>
          <Skeleton className='size-24 rounded-full' />
          <Skeleton className='h-8 w-48' />
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-4 w-40' />
        </div>
      </div>
      <h2 className='mb-6 text-center text-2xl font-semibold'>Actions</h2>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {[1, 2].map((i) => (
          <Card key={i} className='group'>
            <CardHeader>
              <div className='flex items-center space-x-4'>
                <Skeleton className='size-14 rounded-full' />
                <div className='flex flex-col space-y-2'>
                  <Skeleton className='h-6 w-24' />
                  <Skeleton className='h-4 w-32' />
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Container>
  );
}
