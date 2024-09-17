'use client';
import { Button } from '@/components/ui/button';
import React, { useTransition } from 'react';
import { approveSignUp } from './actions';
import { Loader2 } from 'lucide-react';

export default function ApproveButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();
  function handleApprove() {
    startTransition(async () => {
      await approveSignUp(id);
    });
  }

  return (
    <Button onClick={handleApprove}>
      {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      Approve
    </Button>
  );
}
