import React from 'react';
import { Step } from './steps';

interface Props {
  step: Step;
  isCleared: boolean | null;
  isLast: boolean;
}

export default function StepIcon({ step, isCleared, isLast }: Props) {
  const Icon = step.icon;

  return (
    <div className='mr-4 flex flex-col items-center'>
      <div
        className={`rounded-full p-4 ${
          isCleared === true
            ? 'bg-foreground/90'
            : isCleared === false
              ? 'bg-red-500'
              : 'bg-foreground/30'
        }`}
      >
        <Icon className='h-6 w-6 text-background' />
      </div>
      {!isLast && (
        <div className='mt-2 h-full w-0.5 bg-gray-300 dark:bg-gray-700'></div>
      )}
    </div>
  );
}
