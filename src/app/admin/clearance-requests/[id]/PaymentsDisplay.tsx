import React, { Suspense } from 'react';
import {
  Box,
  Loader,
  Skeleton,
  Table,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
  Title,
} from '@mantine/core';
import { getPaymentForStudent } from '../../payments/actions';

type Props = {
  stdNo: string;
};

export default function PaymentsDisplay({ stdNo }: Props) {
  return (
    <Suspense fallback={<Skeleton height={30} />}>
      <PaymentsTable stdNo={stdNo} />
    </Suspense>
  );
}

async function PaymentsTable({ stdNo }: Props) {
  const payments = await getPaymentForStudent(stdNo);
  const rows = payments?.map((payment) => (
    <TableTr key={payment.receiptNo}>
      <TableTd>{payment.receiptNo}</TableTd>
      <TableTd>{payment.item}</TableTd>
      <TableTd>{payment.amount}</TableTd>
    </TableTr>
  ));

  if (!payments.length)
    return (
      <Text c={'dimmed'} size='sm'>
        No Recorded Payments
      </Text>
    );
  return (
    <Box>
      <Title order={5} fw={'normal'}>
        Payment History
      </Title>
      <Table highlightOnHover withTableBorder mt={'sm'}>
        <TableThead>
          <TableTr>
            <TableTh>Receipt No</TableTh>
            <TableTh>Item</TableTh>
            <TableTh>Amount</TableTh>
          </TableTr>
        </TableThead>
        {rows}
      </Table>
    </Box>
  );
}
