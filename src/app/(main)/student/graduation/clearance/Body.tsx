'use client';

import { useEffect, useState } from 'react';
import ButtonHeader from './buttons/ButtonHeader';
import NextButton from './buttons/NextButton';
import ClearanceStatus from './ClearanceStatus';
import ClearanceStep from './ClearanceStep';
import { steps } from './steps';

type ProcessStatus = {
  step: number;
  status: ClearanceStatus['status'] | null;
};

export default function Body() {
  const [state, setState] = useState<'processing' | 'cleared' | 'blocked'>(
    'processing',
  );
  const [status, setStatus] = useState<ProcessStatus[]>([]);

  useEffect(() => {
    if (status.length === steps.length) {
      setState(
        status.every((it) => it.status === 'cleared') ? 'cleared' : 'blocked',
      );
    }
  }, [status]);

  return (
    <>
      <ButtonHeader className='my-4' state={state} />
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
        <NextButton state={state} />
      </div>
    </>
  );
}
