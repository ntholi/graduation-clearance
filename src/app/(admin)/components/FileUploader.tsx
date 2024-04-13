'use client';
import { ActionIcon, FileInput, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCloudUpload } from '@tabler/icons-react';
import React from 'react';

export default function FileUploader() {
  const [opened, { open, close }] = useDisclosure(false);

  async function handleChange(file: File | null) {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title='Authentication'>
        <FileInput label='Input label' onChange={handleChange} />
      </Modal>
      <ActionIcon onClick={open} variant='default'>
        <IconCloudUpload />
      </ActionIcon>
    </>
  );
}
