'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from './student/base/Logo';
import Container from '@/components/ui/container';

export default function ComingSoonPage() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const target = new Date('2024-09-20T10:00:00'); // Set your target date here

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container className='flex min-h-screen flex-col items-center justify-center'>
      <Logo width={500} height={500} className='h-32 w-auto sm:h-56' />
      <Card className='mt-5 w-full max-w-xl'>
        <CardHeader>
          <CardTitle className='text-center text-5xl font-extralight'>
            Graduation Clearance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-2 text-center text-sm text-foreground/90'>
            Clearance begins on {formatDate(target)}
          </p>
          <div className='grid grid-cols-4 gap-4 text-center'>
            <div>
              <span className='text-4xl'>{days}</span>
              <p className='text-sm'>Days</p>
            </div>
            <div>
              <span className='text-4xl'>{hours}</span>
              <p className='text-sm'>Hours</p>
            </div>
            <div>
              <span className='text-4xl'>{minutes}</span>
              <p className='text-sm'>Minutes</p>
            </div>
            <div>
              <span className='text-4xl'>{seconds}</span>
              <p className='text-sm'>Seconds</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  return date.toLocaleDateString(undefined, options);
}
