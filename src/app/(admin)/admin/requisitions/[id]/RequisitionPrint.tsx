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
  TableTdProps,
  TableThProps,
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

        <Table
          mt={'lg'}
          style={{
            borderCollapse: 'collapse',
            border: '1px solid black',
          }}
        >
          <TableThead>
            <TableTr>
              <DarkTh>Description</DarkTh>
              <DarkTh>Quantity</DarkTh>
              <DarkTh>Unit Price</DarkTh>
              <DarkTh>Total Price</DarkTh>
            </TableTr>
          </TableThead>
          {requisition.items.map((item, index) => (
            <TableTbody key={index}>
              <BorderTd>{item.description}</BorderTd>
              <BorderTd>{item.quantity}</BorderTd>
              <BorderTd>{item.unitPrice}</BorderTd>
              <BorderTd>{item.quantity * item.unitPrice}</BorderTd>
            </TableTbody>
          ))}
        </Table>
      </Box>
    );
  }
);

type RowProps = {
  label: string;
  labelProps?: TextProps;
  value?: string | number | null | undefined;
  valueProps?: TextProps;
} & TableTrProps;

function Row({ label, value, labelProps, valueProps, ...props }: RowProps) {
  return (
    <TableTr {...props}>
      <BorderTd
        style={{
          width: '240px',
          border: '1px solid black',
        }}
      >
        <Text {...labelProps}>{label}</Text>
      </BorderTd>
      <BorderTd>
        <Text {...valueProps}>{value}</Text>
      </BorderTd>
    </TableTr>
  );
}

function BorderTd(props: TableTdProps) {
  return (
    <TableTd
      style={{
        border: '1px solid black',
      }}
      {...props}
    />
  );
}

function DarkTh(props: TableThProps) {
  return (
    <TableTh
      style={{
        backgroundColor: 'black',
        color: 'white',
      }}
      {...props}
    />
  );
}

export default RequisitionPrint;
