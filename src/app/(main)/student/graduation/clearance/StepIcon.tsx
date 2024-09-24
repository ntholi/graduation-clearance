import React from 'react';
import { Step } from './steps';
import ClearanceStatus from './ClearanceStatus';

interface Props {
  step: Step;
  status?: ClearanceStatus['status'];
  isLast: boolean;
  isChecking: boolean;
}

export default function StepIcon({ step, isChecking, status, isLast }: Props) {
  const Icon = step.icon;

  let bgColor: string;
  if (isChecking) {
    bgColor = 'bg-foreground/30';
  } else if (status === 'cleared') {
    bgColor = 'bg-foreground/90';
  } else if (status === 'not cleared') {
    bgColor = 'bg-red-500';
  } else {
    bgColor = 'bg-yellow-500';
  }

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
