'use client';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import RequisitionPrint from './RequisitionPrint';
import { Button } from '@mantine/core';

type Props = {
  printable: React.ReactElement;
};

export default function PrintButton({ printable }: Props) {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div style={{ display: 'none' }}>
        {React.cloneElement(printable, {
          ref: componentRef,
        })}
      </div>
      <Button onClick={handlePrint} variant='default'>
        Print
      </Button>
    </div>
  );
}
