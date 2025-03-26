'use client';

import { updateGrade } from '../actions';
import { ActionIcon, Button, Group, Modal, Select, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { IconEdit } from '@tabler/icons-react';

const MODULE_OPTIONS = [
  {
    value: 'BBMG3212#Cross-Culture Management',
    label: 'Cross-Culture Management (BBMG3212)',
  },
  {
    value: 'BBCM2112#Change Management',
    label: 'Change Management (BBCM2112)',
  },
];

export default function UpdateGradeDialog({
  gradeId,
  currentName,
  color = 'blue',
  onUpdate,
}: {
  gradeId: number;
  currentName: string;
  color?: string;
  onUpdate: () => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!value) return;

    setIsSubmitting(true);
    const [code, name] = value.split('#');
    await updateGrade(gradeId, { courseCode: code, courseName: name });
    setIsSubmitting(false);
    onUpdate();
    close();
  };

  return (
    <>
      <ActionIcon variant='subtle' color={color} size='xs' onClick={open}>
        <IconEdit size={16} />
      </ActionIcon>

      <Modal opened={opened} onClose={close} title='Update Module'>
        <Stack>
          <Select
            label='Select new module name'
            placeholder='Choose a module'
            data={MODULE_OPTIONS}
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
