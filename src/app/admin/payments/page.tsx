import {
  Divider,
  Group,
  Paper,
  Stack,
  Table,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Title,
  Button,
} from '@mantine/core';
import RowActions from './RowActions';
import { getPayments } from './actions';
import { FilePlusIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import AddButton from './AddButton';

export default async function PaymentsPage() {
  const data = await getPayments();
  const rows = data.items.map((payment) => (
    <TableTr key={payment.stdNo}>
      <TableTd>
        {payment.stdNo} {payment.name}
      </TableTd>
      <TableTd>{payment.receiptNo}</TableTd>
      <TableTd>{payment.item}</TableTd>
      <TableTd>{payment.amount}</TableTd>
      <TableTd>
        <RowActions payment={payment} />
      </TableTd>
    </TableTr>
  ));

  return (
    <Stack>
      <Paper p='lg' withBorder>
        <Group>
          <Title fw={400} size={18} c='gray'>
            Payments
          </Title>
          <Divider orientation='vertical' />
          <Group>
            <AddButton />
            <Button
              variant='default'
              leftSection={<FilePlusIcon size={'0.9rem'} />}
            >
              Import
            </Button>
          </Group>
        </Group>
      </Paper>
      <Paper p='lg' withBorder>
        <Table highlightOnHover>
          <TableThead>
            <TableTr>
              <TableTh>Student</TableTh>
              <TableTh>Receipt No</TableTh>
              <TableTh>Item</TableTh>
              <TableTh>Amount</TableTh>
            </TableTr>
          </TableThead>
          {rows}
        </Table>
      </Paper>
    </Stack>
  );
}
