import { ActionIcon } from '@mantine/core';
import { PrinterIcon } from 'lucide-react';
import React from 'react';

export default function PrintButton() {
  return (
    <ActionIcon size={'lg'} variant='default'>
      <PrinterIcon size={'1.1rem'} />
    </ActionIcon>
  );
}
