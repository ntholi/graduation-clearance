'use client';

import { ActionIcon, Button, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { deleteGrade } from '../actions';

export default function DeleteGradeDialog({
  gradeId,
  courseCode,
  courseName,
  onDelete,
}: {
  gradeId: number;
  courseCode: string;
  courseName: string;
  onDelete: () => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteGrade(gradeId);
      onDelete();
    } finally {
      setIsSubmitting(false);
      close();
    }
  };

  return (
    <>
      <ActionIcon variant='subtle' color='red' size='xs' onClick={open}>
        <IconTrash size={16} />
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={close}
        title='Delete Module'
        centered
        size='md'
      >
        <Stack>
          <Text>
            Are you sure you want to delete the module <b>{courseCode}</b> -{' '}
            {courseName}? This action cannot be undone.
          </Text>

          <Group justify='flex-end' mt='xl'>
            <Button variant='default' onClick={close} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              color='red'
              onClick={handleDelete}
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Delete Module
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
