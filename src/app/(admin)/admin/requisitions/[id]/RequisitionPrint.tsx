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
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  TableTd,
  TableTrProps,
  TextProps,
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
        <Table
          style={{
            borderCollapse: 'collapse',
            border: '1px solid black',
          }}
        >
          <TableTbody>
            <Row
              label='Campus'
              value={'Maseru'}
              labelProps={{ size: '10pt' }}
              valueProps={{ fw: 'bold', size: '14pt' }}
            />
            <Row
              label='Requested By'
              value={user?.name || ''}
              labelProps={{ size: '10pt' }}
              valueProps={{ fw: 'bold', size: '14pt' }}
            />
            <Row
              label='Head of Department Signature'
              labelProps={{ size: '10pt' }}
              valueProps={{ fw: 'bold', size: '14pt' }}
            />
          </TableTbody>
        </Table>
      </Box>
    );
  }
);

type RowProps = {
  label: string;
  labelProps?: TextProps;
  value?: string;
  valueProps?: TextProps;
} & TableTrProps;

function Row({ label, value, labelProps, valueProps, ...props }: RowProps) {
  return (
    <TableTr {...props}>
      <TableTd
        style={{
          border: '1px solid black',
          width: '250px',
        }}
      >
        <Text {...labelProps}>{label}</Text>
      </TableTd>
      <TableTd
        style={{
          border: '1px solid black',
        }}
      >
        <Text {...valueProps}>{value}</Text>
      </TableTd>
    </TableTr>
  );
}

export default RequisitionPrint;
