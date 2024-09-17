'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { signupRequests } from '@/db/schema';
import { useTransition } from 'react';
import { approveSignUp } from './actions';
import { Loader2 } from 'lucide-react';

type Props = {
  value: typeof signupRequests.$inferSelect;
};

export default function ApproveButton({ value }: Props) {
  const [isPending, startTransition] = useTransition();
  function handleApprove() {
    startTransition(async () => {
      await approveSignUp(value.id);
    });
  }

  return value.approved ? (
    <Badge>Approved</Badge>
  ) : (
    <Button onClick={handleApprove} size={'sm'} disabled={isPending}>
      Approve
    </Button>
  );
}
