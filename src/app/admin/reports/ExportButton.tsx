import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { FileDown } from 'lucide-react';
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
      labels: { confirm: 'I understand, Proceed', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      cancelProps: { color: 'blue' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () =>
        startTransition(async () => {
          await onClick();
        }),
    });

  return (
    <Button
      loading={isPending}
      onClick={openModal}
      variant='default'
      leftSection={<FileDown size={'1rem'} />}
    >
      Export
    </Button>
  );
}
