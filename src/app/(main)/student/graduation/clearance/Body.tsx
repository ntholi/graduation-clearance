'use client';

import React, { useEffect, useState } from 'react';
import { steps } from './steps';
import ClearanceStep from './ClearanceStep';
import NextButton from './NextButton';
import ClearanceStatus from './ClearanceStatus';

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
    </>
  );
}
