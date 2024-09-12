import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { Step } from './steps';

interface Props {
  step: Step;
  isCompleted: boolean;
  isLast: boolean;
  onComplete: (id: number) => void;
}

export default function ClarenceStep({
  step,
  isCompleted,
  isLast,
  onComplete,
}: Props) {
  const Icon = step.icon;

  return (
    <div className={`flex ${!isLast ? 'mb-8' : ''}`}>
      <div className='mr-4 flex flex-col items-center'>
        <div
          className={`rounded-full p-4 ${isCompleted ? 'bg-foreground/90' : 'bg-foreground/30'}`}
        >
          <Icon className='h-6 w-6 text-background' />
        </div>
        {!isLast && (
          <div className='mt-2 h-full w-0.5 bg-gray-300 dark:bg-gray-700'></div>
        )}
      </div>
      <Card className='flex-grow'>
        <CardContent className='pt-6'>
          <h3 className='mb-2 text-xl font-bold text-gray-800 dark:text-gray-100'>
            {step.title}
          </h3>
          {isCompleted ? (
            <div className='flex items-center text-green-600 dark:text-green-400'>
              <CheckCircle2 className='mr-2 h-5 w-5' />
              <span className='text-sm'>Cleared</span>
            </div>
          ) : (
            <Button
              onClick={() => onComplete(step.id)}
              variant='outline'
              className='w-full'
            >
              Request Clearance
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
