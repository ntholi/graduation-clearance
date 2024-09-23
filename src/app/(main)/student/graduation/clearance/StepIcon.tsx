import React from 'react';
import { Step } from './steps';

interface Props {
  step: Step;
  isCleared: boolean;
  isLast: boolean;
  isChecking: boolean;
}

export default function StepIcon({
  step,
  isChecking,
  isCleared,
  isLast,
}: Props) {
  const Icon = step.icon;

  const bgColor = isChecking
    ? 'bg-foreground/30'
    : isCleared
      ? 'bg-foreground/90'
      : 'bg-red-500';

  return (
    <div className='mr-4 flex flex-col items-center'>
      <div className={`rounded-full p-4 ${bgColor}`}>
        <Icon className='h-6 w-6 text-background' />
      </div>
      {!isLast && (
        <div className='mt-2 h-full w-0.5 bg-gray-300 dark:bg-gray-700'></div>
      )}
    </div>
  );
}
