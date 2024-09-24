import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle2, Circle, CircleAlert, Loader2 } from 'lucide-react';
import { Step } from './steps';
import StepIcon from './StepIcon';
import { getClearanceQuery as queryClearanceStatus } from './actions';
import ClearanceStatus from './ClearanceStatus';

interface Props {
  step: Step;
  isLast: boolean;
}

export default function ClearanceStep({ step, isLast }: Props) {
  const [status, setStatus] = useState<ClearanceStatus | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const checkStepClearance = async () => {
      setIsChecking(true);
      try {
        const result = await queryClearanceStatus(step.id);
        setStatus(result);
      } catch (error) {
        console.error('Error checking clearance:', error);
        setStatus(null);
      } finally {
        setIsChecking(false);
      }
    };

    checkStepClearance();
  }, [step.id]);

  return (
    <div className={`flex ${!isLast ? 'mb-8' : ''}`}>
      <StepIcon
        step={step}
        isChecking={isChecking}
        status={status?.status}
        isLast={isLast}
      />
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>{step.title}</CardTitle>
          <CardDescription>{step.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Status isChecking={isChecking} status={status} />
        </CardContent>
      </Card>
    </div>
  );
}

function Status({
  isChecking,
  status,
}: {
  isChecking: boolean;
  status: ClearanceStatus | null;
}) {
  if (isChecking) {
    return (
      <div className='flex items-center text-gray-500'>
        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
        <span className='text-sm'>Checking clearance...</span>
      </div>
    );
  }

  if (status?.status === 'cleared') {
    return (
      <div className='flex items-center text-green-600 dark:text-green-400'>
        <CheckCircle2 className='mr-2 h-5 w-5' />
        <span className='text-sm'>Cleared</span>
      </div>
    );
  }

  if (status?.status === 'pending') {
    return (
      <div className='flex items-center text-yellow-600 dark:text-yellow-400'>
        <Circle className='mr-2 h-5 w-5' />
        <span className='text-sm'>Pending</span>
      </div>
    );
  }

  if (status?.status === 'not cleared') {
    return (
      <div className='flex items-center text-red-600 dark:text-red-400'>
        <CircleAlert className='mr-2 h-5 w-5' />
        <p className='text-sm'>
          Not Cleared{status.message ? `, ${status.message}` : ''}
        </p>
      </div>
    );
  }

  return (
    <div className='flex items-center text-gray-500'>
      <span className='text-sm'>Unable to check clearance</span>
    </div>
  );
}
