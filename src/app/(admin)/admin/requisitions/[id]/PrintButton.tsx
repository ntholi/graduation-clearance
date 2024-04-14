'use client';
import { Button } from '@mantine/core';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

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
