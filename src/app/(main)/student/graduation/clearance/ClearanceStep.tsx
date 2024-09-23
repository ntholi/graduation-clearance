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
import { getClearanceQuery as getClearanceQuery } from './actions';

interface Props {
  step: Step;
  isLast: boolean;
}

export default function ClearanceStep({ step, isLast }: Props) {
  const [query, setQuery] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const checkStepClearance = async () => {
      setIsChecking(true);
      try {
        const result = await getClearanceQuery(step.id);
        setQuery(result);
      } catch (error) {
        console.error('Error checking clearance:', error);
        setQuery(null);
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
        isCleared={query === null}
        isLast={isLast}
      />
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>{step.title}</CardTitle>
          <CardDescription>{step.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ClearanceStatus isChecking={isChecking} query={query} />
        </CardContent>
      </Card>
    </div>
  );
}

function ClearanceStatus({
  isChecking,
  query,
}: {
  isChecking: boolean;
  query: string | null;
}) {
  if (isChecking) {
    return (
      <div className='flex items-center text-gray-500'>
        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
        <span className='text-sm'>Checking clearance...</span>
      </div>
    );
  }

  if (!query) {
    return (
      <div className='flex items-center text-green-600 dark:text-green-400'>
        <CheckCircle2 className='mr-2 h-5 w-5' />
        <span className='text-sm'>Cleared</span>
      </div>
    );
  }

  if (query) {
    return (
      <div className='flex items-center text-red-600 dark:text-red-400'>
        <CircleAlert className='mr-2 h-5 w-5' />
        <p className='text-sm'>Not Cleared{query ? `, ${query}` : ''}</p>
      </div>
    );
  }

  return (
    <div className='flex items-center text-gray-500'>
      <span className='text-sm'>Unable to check clearance</span>
    </div>
  );
}
