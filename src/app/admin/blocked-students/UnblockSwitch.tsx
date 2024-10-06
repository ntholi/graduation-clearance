'use client';

import { blockedStudents } from '@/db/schema';
import { Flex, Switch, rem, useMantineTheme } from '@mantine/core';
import { Check, ShieldAlert, CircleCheck, X } from 'lucide-react';
import { useTransition } from 'react';
import { updateStatus } from './actions';

type Props = {
  blockedStudent: typeof blockedStudents.$inferSelect;
};

export default function UnblockSwitch({ blockedStudent }: Props) {
  const theme = useMantineTheme();
  const { status } = blockedStudent;
  const [isPending, startTransition] = useTransition();

  const update = () => {
    startTransition(async () => {
      await updateStatus(
        blockedStudent.id,
        status === 'blocked' ? 'unblocked' : 'blocked',
      );
    });
  };

  return (
    <Flex justify={'space-between'}>
      <Switch
        checked={status === 'unblocked'}
        onChange={update}
        color='teal'
        size='sm'
        label={
          isPending
            ? 'Updating...'
            : status === 'blocked'
              ? 'Blocked'
              : 'Unblocked'
        }
        description={
          status === 'blocked'
            ? 'Click switch to unblock this student.'
            : 'Click switch to block this student.'
        }
        disabled={isPending}
        thumbIcon={
          status === 'blocked' ? (
            <X style={{ width: rem(12), height: rem(12) }} />
          ) : (
            <Check style={{ width: rem(12), height: rem(12) }} />
          )
        }
      />
      <>
        {status === 'blocked' ? (
          <ShieldAlert size={'2rem'} color={theme.colors.red[5]} />
        ) : (
          <CircleCheck size={'2rem'} color={theme.colors.green[5]} />
        )}
      </>
    </Flex>
  );
}
