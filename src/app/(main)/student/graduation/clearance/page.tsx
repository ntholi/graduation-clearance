'use client';
import React from 'react';
import ClearanceStep from './ClearanceStep';
import Container from '@/components/ui/container';
import { steps } from './steps';

export default function ClearancePage() {
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
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
