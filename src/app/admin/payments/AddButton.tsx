'use client';
import { ActionIcon, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { createPayment } from './actions';
import Form from './Form';
import { PlusIcon } from 'lucide-react';

export default function AddButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title='Add Payment'>
        <Form
          onSubmit={async (value) => {
            const res = await createPayment(value);
            close();
            return res;
          }}
        />
      </Modal>

      <ActionIcon onClick={open} variant='default' size={'lg'}>
        <PlusIcon size={'1.2rem'} />
      </ActionIcon>
    </>
  );
}
