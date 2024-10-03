'use client';

import { financePayments } from '@/db/schema';
import { ActionIcon, Menu, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { DeleteIcon, EllipsisVertical } from 'lucide-react';
import { deletePayment } from './actions';

type Payment = typeof financePayments.$inferSelect;

type Props = {
  payment: Payment & {
    name: string | null;
  };
};

export default function RowActions({ payment }: Props) {
  const openModal = (actionName: string, onConfirm: () => void) =>
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size='sm'>
          Are you sure you want to {actionName.toLowerCase()} this user?
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: onConfirm,
    });

  const handleDelete = async () => {
    openModal(`delete`, () => deletePayment(payment.id));
  };

  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <ActionIcon variant='subtle' color='gray'>
          <EllipsisVertical size={'1rem'} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Actions</Menu.Label>
        <Menu.Item
          leftSection={<DeleteIcon size={'0.9rem'} />}
          onClick={handleDelete}
        >
          <Text size='xs'>Delete</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
