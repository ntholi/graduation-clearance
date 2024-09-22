import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle2, CircleAlert, Loader2 } from 'lucide-react';
import { Step } from './steps';

interface Props {
  step: Step;
  isCleared: boolean | null;
  isLast: boolean;
  onCheckClearance: (id: number) => Promise<boolean>;
}

function ClearanceStep({ step, isCleared, isLast, onCheckClearance }: Props) {
  const [isChecking, setIsChecking] = useState(false);
  const Icon = step.icon;

  useEffect(() => {
    const checkClearance = async () => {
      if (isCleared === null) {
        setIsChecking(true);
        await onCheckClearance(step.id);
        setIsChecking(false);
      }
    };

    checkClearance();
  }, [isCleared, onCheckClearance, step.id]);

  return (
    <div className={`flex ${!isLast ? 'mb-8' : ''}`}>
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
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>{step.title}</CardTitle>
          <CardDescription>{step.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {isChecking ? (
            <div className='flex items-center text-gray-500'>
              <Loader2 className='mr-2 h-5 w-5 animate-spin' />
              <span className='text-sm'>Checking clearance...</span>
            </div>
          ) : isCleared === true ? (
            <div className='flex items-center text-green-600 dark:text-green-400'>
              <CheckCircle2 className='mr-2 h-5 w-5' />
              <span className='text-sm'>Cleared</span>
            </div>
          ) : isCleared === false ? (
            <div className='flex items-center text-red-600 dark:text-red-400'>
              <CircleAlert className='mr-2 h-5 w-5' />
              <span className='text-sm'>Not Cleared</span>
            </div>
          ) : (
            <div className='flex items-center text-gray-500'>
              <span className='text-sm'>Unable to check clearance</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ClearanceStep;
