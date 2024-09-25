import React from 'react';
import { CheckCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function GraduationClearanceSuccess() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card className='w-full max-w-md -translate-y-10'>
        <CardHeader className='text-center'>
          <CheckCircle className='mx-auto size-16 text-green-500' />
          <CardTitle className='mt-4 text-2xl font-bold'>
            Clearance Successful!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-4 text-center'>
            Congratulations! You have successfully cleared for graduation.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className='w-full'>
            <Link href='/student'>Return to Student Portal</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
