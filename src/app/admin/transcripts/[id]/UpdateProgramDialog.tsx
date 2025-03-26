'use client';

import { ActionIcon, Button, Modal, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil } from '@tabler/icons-react';
import { useState, useTransition } from 'react';
import { updateStudent } from '../actions';

const CERTIFICATE_PROGRAMS = [
  'Certificate in Architectural Technology',
  'Certificate in Business Information Technology',
  'Certificate in Graphic Design',
  'Certificate in Innovative Travel & Tourism',
  'Certificate in Marketing',
  'Certificate in Performing Arts',
  'Certificate in Radio Broadcasting',
];

export default function UpdateProgramDialog({
  stdNo,
  currentProgram,
  color = 'dimmed',
  onUpdate,
}: {
  stdNo: string;
  currentProgram: string;
  color?: string;
  onUpdate?: () => Promise<void>;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [program, setProgram] = useState(currentProgram);
  const [pending, startTransition] = useTransition();

  async function handleSubmit() {
    startTransition(async () => {
      await updateStudent(stdNo, { program });
      if (onUpdate) await onUpdate();
      close();
    });
  }

  return (
    <>
      <ActionIcon variant='subtle' color={color} size='xs' onClick={open}>
        <IconPencil style={{ width: '0.8rem', height: '0.8rem' }} />
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={close}
        title='Update Program'
        centered
        size='md'
      >
        <Select
          label='Program'
          description='Select a certificate program'
          data={CERTIFICATE_PROGRAMS}
          value={program}
          onChange={(value) => value && setProgram(value)}
          searchable
          nothingFoundMessage='No matching programs'
          mb='md'
        />

        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}
        >
          <Button variant='default' onClick={close} disabled={pending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={pending} disabled={!program}>
            Save Changes
          </Button>
        </div>
      </Modal>
    </>
  );
}
