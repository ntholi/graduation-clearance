'use client';
import React, { useState } from 'react';
import ClearanceStep from './ClearanceStep';
import { steps } from './steps';
import Container from '@/components/ui/container';
import { checkClearance } from './actions';

export default function ClearancePage() {
  const [clearanceStatus, setClearanceStatus] = useState<
    Record<number, boolean | null>
  >(Object.fromEntries(steps.map((step) => [step.id, null])));

  const handleCheckClearance = async (stepId: number) => {
    const isCleared = await checkClearance(stepId);
    setClearanceStatus((prev) => ({ ...prev, [stepId]: isCleared }));
    return isCleared;
  };

  return (
    <div className='min-h-screen bg-muted/20'>
      <Container className='pb-5'>
        <div className='mx-auto max-w-2xl'>
          <h1 className='py-10 text-center text-3xl font-semibold text-gray-800 dark:text-gray-200'>
            Graduation Clearance
          </h1>
          <div className='space-y-4'>
            {steps.map((step, index) => (
              <ClearanceStep
                key={step.id}
                step={step}
                isCleared={clearanceStatus[step.id]}
                isLast={index === steps.length - 1}
                onCheckClearance={handleCheckClearance}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
