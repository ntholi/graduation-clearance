import { Button } from '@/components/ui/button';
import { blockedStudents } from '@/db/schema';
import { useTransition } from 'react';
import { unblockStudent } from './actions';

type Props = {
  value: typeof blockedStudents.$inferSelect;
};

export default function Unblock({ value }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleUnblock() {
    startTransition(async () => {
      await unblockStudent(value.id);
    });
  }

  return (
    <Button size={'sm'} disabled={isPending} onClick={handleUnblock}>
      Unblock
    </Button>
  );
}
