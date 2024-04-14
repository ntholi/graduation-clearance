'use client';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import RequisitionPrint from './RequisitionPrint';

export default function PrintButton() {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div style={{ display: 'none' }}>
        <RequisitionPrint ref={componentRef} />
      </div>
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
}
