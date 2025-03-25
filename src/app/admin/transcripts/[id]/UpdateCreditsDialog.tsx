'use client';

import { updateGrade } from '../actions';
import { ActionIcon, Button, Group, Modal, Select, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { IconCalculator } from '@tabler/icons-react';

const CREDITS_OPTIONS = [
  { value: '6', label: '6 Credits' },
  { value: '8', label: '8 Credits' },
  { value: '10', label: '10 Credits' },
  { value: '12', label: '12 Credits' },
];

export default function UpdateCreditsDialog({
  gradeId,
  currentCredits,
  onUpdate,
}: {
  gradeId: number;
  currentCredits: number;
  onUpdate: () => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState(currentCredits.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!value) return;

    setIsSubmitting(true);
    await updateGrade(gradeId, { credits: parseInt(value, 10) });
    setIsSubmitting(false);
    onUpdate();
    close();
  };

  return (
    <>
      <ActionIcon variant='subtle' size='xs' onClick={open}>
        <IconCalculator size={16} />
      </ActionIcon>

      <Modal opened={opened} onClose={close} title='Update Credits'>
        <Stack>
          <Select
            label='Select credit value'
            placeholder='Choose credits'
            data={CREDITS_OPTIONS}
            value={value}
            onChange={(val) => setValue(val || '')}
          />

          <Group justify='apart' grow>
            <Button variant='subtle' color='red' onClick={close}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={!value}
            >
              Update
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
