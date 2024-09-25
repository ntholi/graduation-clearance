import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getClearanceQuery } from './actions';
import { steps } from './steps';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import saveConfirmation from '../confirmation/actions';
import { useSession } from 'next-auth/react';
import { getStudentByUserId } from '@/app/admin/students/actions';

type Props = {
  className?: string;
};
export default function ClearanceStatusButton({ className }: Props) {
  const [isCleared, setIsCleared] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    const checkAllClearances = async () => {
      setIsLoading(true);
      const student = await getStudentByUserId(session.data?.user?.id);
      if (!student) {
        return;
      }
      try {
        const results = await Promise.all(
          steps.map((step) => getClearanceQuery(step.id)),
        );
        const cleared = results.every((result) => result.status === 'cleared');
        await saveConfirmation({ stdNo: student.stdNo, cleared });
        setIsCleared(cleared);
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
      <Button
        disabled={!isCleared || isLoading}
        onClick={() => router.push('/student/graduation/confirmation')}
      >
        Next
      </Button>
    </div>
  );
}
