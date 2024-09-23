import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getClearanceQuery } from './actions';
import { steps } from './steps';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};
export default function ClearanceStatusButton({ className }: Props) {
  const [isCleared, setIsCleared] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAllClearances = async () => {
      setIsLoading(true);
      try {
        const results = await Promise.all(
          steps.map((step) => getClearanceQuery(step.id)),
        );
        setIsCleared(results.every((result) => result === null));
      } catch (error) {
        console.error('Error checking clearances:', error);
        setIsCleared(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAllClearances();
  }, []);

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-lg bg-background p-4',
        className,
      )}
    >
      <p>
        {isLoading
          ? 'Checking clearance...'
          : isCleared
            ? 'Cleared'
            : 'Not Cleared'}
      </p>
      <Button disabled={!isCleared || isLoading}>Next</Button>
    </div>
  );
}
