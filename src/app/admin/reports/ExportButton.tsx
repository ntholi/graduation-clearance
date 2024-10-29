import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useTransition } from 'react';

type Props = {
  onClick: () => Promise<void>;
};
export default function ExportButton({ onClick }: Props) {
  const [isPending, startTransition] = useTransition();

  const openModal = () =>
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size='sm'>
          This is a very costly operation, are you sure you want to proceed?
        </Text>
      ),
      labels: { confirm: 'Export', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      cancelProps: { color: 'blue' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () =>
        startTransition(async () => {
          await onClick();
        }),
    });

  return (
    <Button loading={isPending} onClick={openModal}>
      Export
    </Button>
  );
}
