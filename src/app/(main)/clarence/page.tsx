'use client';
import React, { useState } from 'react';
import ClarenceStep from './ClarenceStep';
import { steps } from './steps';
import Container from '@/components/ui/container';

export default function ClearancePage() {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(
    new Set([1, 2, 3]),
  );

  const handleComplete = (stepId: number) => {
    setCompletedSteps((prev) => new Set(prev).add(stepId));
  };

  return (
    <div className='bg-muted/20'>
      <Container className='min-h-screen'>
        <div className='mx-auto max-w-2xl'>
          <h1 className='py-10 text-center text-3xl text-gray-800 dark:text-gray-200'>
            Graduation Clearance
          </h1>
          <div className='space-y-4'>
            {steps.map((step, index) => (
              <ClarenceStep
                key={step.id}
                step={step}
                isCompleted={completedSteps.has(step.id)}
                isLast={index === steps.length - 1}
                onComplete={handleComplete}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
