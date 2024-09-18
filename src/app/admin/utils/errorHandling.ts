import { notifications } from '@mantine/notifications';

export async function withErrorHandling(action: () => Promise<void>) {
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
}
