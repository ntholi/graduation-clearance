import React from 'react';
import { Text, Title } from '@mantine/core';

const RequisitionPrint = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} {...props}>
      <Title fw={'lighter'} ta={'center'}>
        RequisitionPrint
      </Title>
    </div>
  );
});

export default RequisitionPrint;
