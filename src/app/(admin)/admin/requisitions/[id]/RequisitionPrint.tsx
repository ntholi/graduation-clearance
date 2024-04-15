import React, { forwardRef } from 'react';
import { Title } from '@mantine/core';
import { Requisition, RequisitionItem } from '@prisma/client';

type Props = {
  requisition: Requisition & { items: RequisitionItem[] };
};

const RequisitionPrint = forwardRef<HTMLDivElement, Props>(
  ({ requisition, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        <Title fw={'lighter'} ta={'center'}>
          {requisition.title}
        </Title>
      </div>
    );
  }
);

export default RequisitionPrint;
