'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { TbEyeOff, TbEye } from 'react-icons/tb';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

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
  const termKey = `term-${termId}`;
  const isHidden = hiddenTerms[termKey] || false;

  const toggleVisibility = () => {
    setHiddenTerms((prev) => ({
      ...prev,
      [termKey]: !isHidden,
    }));
  };

  return (
    <Tooltip
      label={isHidden ? 'Show Term' : 'Hide Term'}
      withArrow
      position='top'
    >
      <ActionIcon
        variant='subtle'
        color={isHidden ? 'blue' : 'gray'}
        onClick={toggleVisibility}
        aria-label={isHidden ? 'Show Term' : 'Hide Term'}
        size='md'
      >
        {isHidden ? <TbEye size={18} /> : <TbEyeOff size={18} />}
      </ActionIcon>
    </Tooltip>
  );
}
