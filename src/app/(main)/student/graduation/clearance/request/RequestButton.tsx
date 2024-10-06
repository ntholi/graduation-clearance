'use client';

import { useTransition } from 'react';
import { requestClearance } from './actions';
import { useRouter } from 'next/navigation';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type Props = {
  stdNo?: string | null;
} & ButtonProps;

export default function RequestButton({ stdNo }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRequestClearance() {
    if (!stdNo) return;
    startTransition(async () => {
      await requestClearance(stdNo);
      router.push('/student/graduation/clearance/');
    });
  }

  return (
    <Button
      className='w-full'
      onClick={handleRequestClearance}
      disabled={isPending}
    >
      {isPending && <Loader2 className='mr-2 size-4 animate-spin' />}
      Request Clearance
    </Button>
  );
}
