'use client';

import { ActionIcon, Tooltip, Modal, Button } from '@mantine/core';
import { TbEyeOff, TbEye } from 'react-icons/tb';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useState } from 'react';

export const hiddenTermsAtom = atomWithStorage<Record<string, boolean>>(
  'hiddenTerms',
  {},
);

type HideTermButtonProps = {
  termId: number;
  termName: string;
};

export default function HideTermButton({
  termId,
  termName,
}: HideTermButtonProps) {
  const [hiddenTerms, setHiddenTerms] = useAtom(hiddenTermsAtom);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const termKey = `term-${termId}`;
  const isHidden = hiddenTerms[termKey] || false;

  const toggleVisibility = () => {
    setHiddenTerms((prev) => ({
      ...prev,
      [termKey]: !isHidden,
    }));
    setIsConfirmOpen(false);
  };

  return (
    <>
      <Tooltip
        label={isHidden ? 'Show Term' : 'Hide Term'}
        withArrow
        position='top'
      >
        <ActionIcon
          variant='subtle'
          color={isHidden ? 'blue' : 'gray'}
          onClick={() => setIsConfirmOpen(true)}
          aria-label={isHidden ? 'Show Term' : 'Hide Term'}
          size='md'
        >
          {isHidden ? <TbEye size={18} /> : <TbEyeOff size={18} />}
        </ActionIcon>
      </Tooltip>

      <Modal
        opened={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title={isHidden ? 'Show Term' : 'Hide Term'}
      >
        <p>Are you sure you want to {isHidden ? 'show' : 'hide'} this term?</p>
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
