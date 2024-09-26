'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type Props = {
  className?: string;
  state: 'processing' | 'cleared' | 'blocked';
};
export default function NextButton({ className, state }: Props) {
  const router = useRouter();

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-lg bg-background p-4',
        className,
      )}
    >
      <p>
        {state === 'processing'
          ? 'Checking clearance...'
          : state === 'cleared'
            ? 'Cleared'
            : 'Not Cleared'}
      </p>
      <Button
        disabled={state !== 'cleared'}
        onClick={() => router.push('/student/graduation/confirmation')}
      >
        Next
      </Button>
    </div>
  );
}
