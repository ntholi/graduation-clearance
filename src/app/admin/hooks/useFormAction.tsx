import { notifications } from '@mantine/notifications';
import { useTransition } from 'react';

export default function useFormAction(): [
  boolean,
  (action: () => Promise<void>) => void,
] {
  const [submitting, startTransition] = useTransition();

  function submitForm(action: () => Promise<void>) {
    startTransition(async () => {
      try {
        await action();
      } catch (err) {
        console.error(err);
        notifications.show({
          title: 'Error',
          message:
            err instanceof Error ? err.message : 'An unexpected error occurred',
          color: 'red',
        });
      }
    });
  }

  return [submitting, submitForm];
}
