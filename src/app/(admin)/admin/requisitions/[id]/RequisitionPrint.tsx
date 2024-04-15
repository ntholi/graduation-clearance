import React, { PropsWithChildren, forwardRef } from 'react';
import {
  Box,
  BoxProps,
  Grid,
  GridCol,
  GridProps,
  Group,
  Title,
  Text,
  Image,
  Stack,
  Divider,
} from '@mantine/core';
import { Requisition, RequisitionItem } from '@prisma/client';
import { User } from 'next-auth';

type Props = {
  requisition: Requisition & { items: RequisitionItem[] };
  user?: User;
};

const RequisitionPrint = forwardRef<HTMLDivElement, Props>(
  ({ requisition, user, ...props }, ref) => {
    return (
      <Box p='xl' ref={ref} {...props}>
        <Group>
          <Image src='/images/logo.png' alt='logo' width={100} height={100} />
          <Box>
            <Title order={3}>Resource Requisition (Capital Asset) </Title>
            <Title order={4} fw={'normal'} c='gray'>
              Registry Department
            </Title>
          </Box>
        </Group>
        <Divider my={'md'} />
        <Row label='Campus' value='Maseru' />
        <Row label='Name' value={user?.name || ''} />
      </Box>
    );
  }
);

type RowProps = {
  label: string;
  value: string;
} & GridProps;

function Row({ label, value, ...props }: RowProps) {
  return (
    <Grid {...props} gutter={5}>
      <GridCol span={4} style={{ border: '1px solid black' }} p='xs'>
        <Text size='12px'>{label}</Text>
      </GridCol>
      <GridCol
        span={8}
        style={{ border: '1px solid black', borderLeftWidth: 0 }}
        p='sm'
      >
        <Text size='12px'>{value}</Text>
      </GridCol>
    </Grid>
  );
}

export default RequisitionPrint;
