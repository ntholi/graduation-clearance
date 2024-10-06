'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRightIcon, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import saveConfirmation from '../../confirmation/actions';

type Props = {
  className?: string;
  state: 'processing' | 'cleared' | 'blocked';
};
export default function ButtonHeader({ className, state }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleNext() {
    startTransition(async () => {
      if (!session?.user?.student?.program) return;
      await saveConfirmation({
        stdNo: session?.user.student.stdNo,
        cleared: state === 'cleared',
      });
      router.push('/student/graduation/confirmation');
    });
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-lg bg-background p-4 text-sm',
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
        onClick={handleNext}
        className='flex min-w-32 items-center gap-2'
      >
        {isPending && <Loader2 className='size-4 animate-spin' />}
        <span>Next</span>
        <ArrowRightIcon className='size-4' />
      </Button>
    </div>
  );
}
