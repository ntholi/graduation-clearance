'use client';

import React, { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CircleCheck } from 'lucide-react';
import { requestClearance } from './actions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RequestClearance() {
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const router = useRouter();

  function handleRequestClearance() {
    startTransition(async () => {
      await requestClearance(session?.user?.student?.stdNo);
      router.push('/student/graduation/clearance/');
    });
  }

  return (
    <div className='flex h-[80vh] items-center justify-center p-4'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle>Clearance Request</CardTitle>
          <CardDescription>
            Your clearance request will be processed by the respective
            departments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='rounded-lg px-2 shadow-sm'>
            <h3 className='mb-4 text-lg'>Departments</h3>
            <ul className='space-y-3'>
              {['Faculty', 'Library', 'Finance', 'Resource'].map(
                (dept, index) => (
                  <li key={index} className='flex items-center space-x-3'>
                    <CircleCheck className='size-4' />
                    <span className='text-sm'>{dept}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </CardContent>
        <CardFooter className='mt-6'>
          <Button className='w-full' onClick={handleRequestClearance}>
            {isPending ? 'Requesting...' : 'Request Clearance'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
