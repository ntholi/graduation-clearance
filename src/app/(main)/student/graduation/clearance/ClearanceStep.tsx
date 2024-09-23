import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle2, CircleAlert, Loader2 } from 'lucide-react';
import { Step } from './steps';
import StepIcon from './StepIcon';
import { checkClearance } from './actions';

interface Props {
  step: Step;
  isLast: boolean;
}

export default function ClearanceStep({ step, isLast }: Props) {
  const [isCleared, setIsCleared] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const checkStepClearance = async () => {
      setIsChecking(true);
      try {
        const result = await checkClearance(step.id);
        setIsCleared(result);
      } catch (error) {
        console.error('Error checking clearance:', error);
        setIsCleared(null);
      } finally {
        setIsChecking(false);
      }
    };

    checkStepClearance();
  }, [step.id]);

  return (
    <div className={`flex ${!isLast ? 'mb-8' : ''}`}>
      <StepIcon step={step} isCleared={isCleared} isLast={isLast} />
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>{step.title}</CardTitle>
          <CardDescription>{step.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ClearanceStatus isChecking={isChecking} isCleared={isCleared} />
        </CardContent>
      </Card>
    </div>
  );
}

function ClearanceStatus({
  isChecking,
  isCleared,
}: {
  isChecking: boolean;
  isCleared: boolean | null;
}) {
  if (isChecking) {
    return (
      <div className='flex items-center text-gray-500'>
        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
        <span className='text-sm'>Checking clearance...</span>
      </div>
    );
  }

  if (isCleared === true) {
    return (
      <div className='flex items-center text-green-600 dark:text-green-400'>
        <CheckCircle2 className='mr-2 h-5 w-5' />
        <span className='text-sm'>Cleared</span>
      </div>
    );
  }

  if (isCleared === false) {
    return (
      <div className='flex items-center text-red-600 dark:text-red-400'>
        <CircleAlert className='mr-2 h-5 w-5' />
        <span className='text-sm'>Not Cleared</span>
      </div>
    );
  }

  return (
    <div className='flex items-center text-gray-500'>
      <span className='text-sm'>Unable to check clearance</span>
    </div>
  );
}
