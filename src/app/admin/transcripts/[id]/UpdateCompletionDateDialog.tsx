'use client';

import { ActionIcon, Button, Modal } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil } from '@tabler/icons-react';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { completionDateAtom } from './components/TranscriptProvider';

export default function UpdateCompletionDateDialog({
  currentDate = 'November 2024',
  color = 'dimmed',
}: {
  currentDate?: string;
  color?: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [, setGlobalCompletionDate] = useAtom(completionDateAtom);

  // Parse current date format (e.g., "November 2024") to Date object
  const parseInitialDate = () => {
    try {
      const [month, year] = currentDate.split(' ');
      const monthIndex = new Date(Date.parse(`${month} 1, ${year}`)).getMonth();
      return new Date(parseInt(year), monthIndex, 1);
    } catch (e) {
      return new Date(); // Default to current date if parsing fails
    }
  };

  const [date, setDate] = useState<Date | null>(parseInitialDate());

  function handleSubmit() {
    if (date) {
      // Format date back to "Month Year" format
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
      setGlobalCompletionDate(formattedDate);
    }
    close();
  }

  return (
    <>
      <ActionIcon variant='subtle' color={color} size='xs' onClick={open}>
        <IconPencil style={{ width: '0.8rem', height: '0.8rem' }} />
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={close}
        title='Update Date of Completion'
        centered
        size='md'
      >
        <MonthPickerInput
          label='Date of Completion'
          placeholder='Pick a month'
          value={date}
          onChange={setDate}
          mb='md'
          clearable={false}
        />

        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}
        >
          <Button variant='default' onClick={close}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!date}>
            Save Changes
          </Button>
        </div>
      </Modal>
    </>
  );
}
