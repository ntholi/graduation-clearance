'use client';

import React, { useEffect, useState } from 'react';
import { steps } from './steps';
import ClearanceStep from './ClearanceStep';
import NextButton from './NextButton';
import ClearanceStatus from './ClearanceStatus';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

type ProcessStatus = {
  step: number;
  status: ClearanceStatus['status'] | null;
};

export default function Body() {
  const [state, setState] = useState<'processing' | 'cleared' | 'blocked'>(
    'processing',
  );
  const [status, setStatus] = useState<ProcessStatus[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (status.length === steps.length) {
      setState(
        status.every((it) => it.status === 'cleared') ? 'cleared' : 'blocked',
      );
    }
  }, [status]);

  return (
    <>
      <NextButton className='my-4' state={state} />
      <div className='space-y-4'>
        {steps.map((step, index) => (
          <ClearanceStep
            key={step.id}
            step={step}
            isLast={index === steps.length - 1}
            setStatus={(it) => {
              setStatus((prev) => [...prev, { step: step.id, status: it }]);
            }}
          />
        ))}
      </div>
      <div className='ml-[4.5rem] mt-6'>
        <Button
          disabled={state !== 'cleared'}
          className='w-full'
          onClick={() => router.push('/student/graduation/confirmation')}
          variant={'outline'}
        >
          Next <ArrowRightIcon className='ml-2 size-4' />
        </Button>
      </div>
    </>
  );
}
