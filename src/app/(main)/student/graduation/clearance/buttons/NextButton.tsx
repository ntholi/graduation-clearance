import { Button } from '@/components/ui/button';
import { ArrowRightIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import saveConfirmation from '../../confirmation/actions';
import { useSession } from 'next-auth/react';

type Props = {
  state: 'cleared' | 'blocked' | 'processing';
};
export default function NextButton({ state }: Props) {
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
    <Button
      disabled={state !== 'cleared' || isPending}
      className='w-full'
      onClick={handleNext}
      variant={'outline'}
    >
      {isPending && <Loader2 className='mr-2 size-4 animate-spin' />}
      Next <ArrowRightIcon className='ml-2 size-4' />
    </Button>
  );
}
