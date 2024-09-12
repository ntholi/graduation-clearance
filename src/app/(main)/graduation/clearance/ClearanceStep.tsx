import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle2, Info } from 'lucide-react';
import { Step } from './steps';

interface Props {
  step: Step;
  isCleared: boolean;
  isLast: boolean;
  onClear: (id: number) => void;
}

function ClearanceStep({ step, isCleared, isLast, onClear }: Props) {
  const Icon = step.icon;

  return (
    <div className={`flex ${!isLast ? 'mb-8' : ''}`}>
      <div className='mr-4 flex flex-col items-center'>
        <div
          className={`rounded-full p-4 ${isCleared ? 'bg-foreground/90' : 'bg-foreground/30'}`}
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
          {isCleared ? (
            <div className='flex items-center text-green-600 dark:text-green-400'>
              <CheckCircle2 className='mr-2 h-5 w-5' />
              <span className='text-sm'>Cleared</span>
            </div>
          ) : (
            <div className='flex items-center justify-between'>
              <div className='flex items-center text-red-600 dark:text-red-400'>
                <Info className='mr-2 h-5 w-5' />
                <span className='text-sm'>Not Cleared</span>
              </div>
              <Button onClick={() => onClear(step.id)}>
                Request Clearance
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
export default ClearanceStep;
