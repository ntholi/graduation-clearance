import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function LoadingSkeleton() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-4 text-foreground'>
      <Card className='w-full max-w-md -translate-y-20'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            <Skeleton className='h-8 w-3/4' />
          </CardTitle>
          <CardDescription>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='mt-2 h-4 w-5/6' />
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <Skeleton className='mb-2 h-4 w-1/4' />
            <Skeleton className='h-6 w-1/2' />
          </div>
          <div>
            <Skeleton className='mb-2 h-4 w-1/3' />
            <Skeleton className='h-6 w-2/3' />
          </div>
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-4 w-4 rounded' />
            <Skeleton className='h-4 w-5/6' />
          </div>
        </CardContent>
        <CardFooter>
          <Button className='w-full' disabled>
            <Skeleton className='h-5 w-16' />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
