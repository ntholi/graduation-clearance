import { notifications } from '@mantine/notifications';
import { useTransition } from 'react';

type ReturnType = [boolean, (action: () => Promise<void>) => void];

export default function useFormAction(): ReturnType {
  const [pending, startTransition] = useTransition();

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

  return [pending, submitForm];
}
