'use client';

import { ActionIcon, Tooltip, Modal, Button } from '@mantine/core';
import { TbEyeOff, TbEye } from 'react-icons/tb';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useState } from 'react';

export const hiddenModulesAtom = atomWithStorage<Record<string, boolean>>(
  'hiddenModules',
  {},
);

type HideModuleButtonProps = {
  moduleId: number;
  courseCode: string;
  courseName: string;
};

export default function HideModuleButton({
  moduleId,
  courseCode,
  courseName,
}: HideModuleButtonProps) {
  const [hiddenModules, setHiddenModules] = useAtom(hiddenModulesAtom);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const moduleKey = `module-${moduleId}`;
  const isHidden = hiddenModules[moduleKey] || false;

  const toggleVisibility = () => {
    setHiddenModules((prev) => ({
      ...prev,
      [moduleKey]: !isHidden,
    }));
    setIsConfirmOpen(false);
  };

  return (
    <>
      <Tooltip
        label={isHidden ? 'Show Module' : 'Hide Module'}
        withArrow
        position='top'
      >
        <ActionIcon
          variant='subtle'
          color={isHidden ? 'blue' : 'gray'}
          onClick={() => setIsConfirmOpen(true)}
          aria-label={isHidden ? 'Show Module' : 'Hide Module'}
          size='sm'
        >
          {isHidden ? <TbEye size={14} /> : <TbEyeOff size={14} />}
        </ActionIcon>
      </Tooltip>

      <Modal
        opened={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title={isHidden ? 'Show Module' : 'Hide Module'}
      >
        <p>
          Are you sure you want to {isHidden ? 'show' : 'hide'} this module?
        </p>
        <p>
          <strong>{courseCode}</strong> - {courseName}
        </p>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
        >
          <Button variant='outline' onClick={() => setIsConfirmOpen(false)}>
            Cancel
          </Button>
          <Button onClick={toggleVisibility}>
            {isHidden ? 'Show' : 'Hide'}
          </Button>
        </div>
      </Modal>
    </>
  );
}
