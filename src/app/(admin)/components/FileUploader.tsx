'use client';
import {
  ActionIcon,
  Button,
  FileInput,
  Modal,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCloudUpload } from '@tabler/icons-react';
import React, { useTransition } from 'react';

export default function FileUploader() {
  const [opened, { open, close }] = useDisclosure(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [description, setDescription] = React.useState<string>('');
  const [isPending, startTransition] = useTransition();

  async function handleUpload() {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);

    startTransition(async () => {
      await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      setFile(null);
      setDescription('');
      close();
    });
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title='Upload Dialog'>
        <Stack>
          <FileInput required label='File' onChange={setFile} value={file} />
          <TextInput
            label='Description'
            description='Describe the file, may be left empty.'
            onChange={(event) => setDescription(event.currentTarget.value)}
            value={description}
          />
          <Button onClick={handleUpload} loading={isPending}>
            Upload
          </Button>
        </Stack>
      </Modal>
      <ActionIcon onClick={open} variant='default' h={200} w={'100%'}>
        <Stack align='center' gap={10}>
          <IconCloudUpload size={'2rem'} />
          <Text size='0.9rem' c='gray'>
            Upload
          </Text>
        </Stack>
      </ActionIcon>
    </>
  );
}
