'use client';

import React from 'react';
import { steps } from './steps';
import ClearanceStep from './ClearanceStep';

export default function Body() {
  return (
    <div className='space-y-4'>
      {steps.map((step, index) => (
        <ClearanceStep
          key={step.id}
          step={step}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  );
}
