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
} from '@mantine/core';
import AddButton from './AddButton';
import ImportButton from './ImportButton';
import RowActions from './RowActions';
import { getPayments, importPayments } from './actions';

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
            <ImportButton action={importPayments} />
            <AddButton />
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
