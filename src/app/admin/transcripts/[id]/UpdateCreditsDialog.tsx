'use client';

import { updateGrade } from '../actions';
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Paper,
  Slider,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { IconCalculator } from '@tabler/icons-react';

const CREDITS_MARKS = [
  { value: 6, label: '6' },
  { value: 8, label: '8' },
  { value: 10, label: '10' },
  { value: 12, label: '12' },
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
  const [value, setValue] = useState<number>(currentCredits);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!value) return;

    setIsSubmitting(true);
    await updateGrade(gradeId, { credits: value });
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
          <Text size='sm' c='dimmed'>
            Slide to select the new credits for this module.
          </Text>

          <Paper withBorder p='xl'>
            <Slider
              marks={CREDITS_MARKS}
              min={6}
              max={12}
              step={2}
              value={value}
              onChange={setValue}
              label={(value) => `${value} Credits`}
              styles={{ markLabel: { fontSize: '12px' } }}
              thumbSize={16}
              restrictToMarks
            />
          </Paper>

          <Group justify='apart' grow mt='xl'>
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
