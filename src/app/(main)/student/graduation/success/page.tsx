'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import confetti from 'canvas-confetti';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function GraduationClearanceSuccess() {
  const searchParams = useSearchParams();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function showConfetti() {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      confetti({
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
      });
    }
    if (searchParams.get('ref') === 'confirmation') {
      showConfetti();
    }
  }, []);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card className='w-full max-w-md -translate-y-10' ref={cardRef}>
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
