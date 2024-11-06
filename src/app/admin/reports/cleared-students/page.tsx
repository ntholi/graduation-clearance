'use client';

import { dateTime } from '@/lib/format';
import {
  Box,
  Flex,
  Group,
  Pagination,
  Paper,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
  Title,
  Button,
  TextInput,
  Divider,
  CloseButton,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';
import { countClearedStudents, getClearedStudents } from './actions';
import { exportToExcel } from './export';
import ExportButton from '../ExportButton';
import { SearchIcon } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useState } from 'react';
import { Stack as MantineStack } from '@mantine/core';

export default function Page() {
  const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data: counts } = useQuery({
    queryKey: ['clearance-counts'],
    queryFn: () => countClearedStudents(),
  });

  const { data, isLoading } = useQuery({
    queryKey: ['clearance-responses', currentPage, debouncedSearch],
    queryFn: () => getClearedStudents(currentPage ?? 1, debouncedSearch),
  });

  return (
    <Stack>
      <Paper withBorder p='md'>
        <Flex justify='space-between' align='end'>
          <div>
            <Title fw={'lighter'} order={3}>
              Cleared Students
            </Title>
            <Group mt='xs'>
              <Text size='sm'>
                <Text span fw={500}>
                  {counts ?? '?'}
                </Text>{' '}
                students cleared
              </Text>
            </Group>
          </div>
          <Group>
            <TextInput
              placeholder='Search students...'
              leftSection={<SearchIcon size={16} />}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              rightSection={
                <CloseButton
                  aria-label='Clear input'
                  onClick={() => setSearch('')}
                  style={{ display: search ? undefined : 'none' }}
                />
              }
            />
            <Divider orientation='vertical' />
            <ExportButton onClick={exportToExcel} />
          </Group>
        </Flex>
      </Paper>
      <Paper withBorder p='md'>
        <Table.ScrollContainer minWidth={1300}>
          <Table>
            <TableThead>
              <TableTr>
                <TableTh>Student No</TableTh>
                <TableTh>Names</TableTh>
                <TableTh>Programme</TableTh>
                <TableTh>Date Requested</TableTh>
                <TableTh>Date Cleared</TableTh>
                <TableTh>Cleared By</TableTh>
                <TableTh>Receipt No</TableTh>
                <TableTh>Item</TableTh>
                <TableTh>Amount</TableTh>
              </TableTr>
            </TableThead>
            {isLoading ? (
              <Box py={'md'} px={'sm'}>
                <Text size='sm' c='dimmed'>
                  Loading...
                </Text>
              </Box>
            ) : (
              <TableContent items={data?.items ?? []} />
            )}
          </Table>
          <Pagination
            mt={'xl'}
            size='xs'
            total={data?.pages ?? 0}
            value={currentPage ?? 1}
            onChange={setCurrentPage}
          />
        </Table.ScrollContainer>
      </Paper>
    </Stack>
  );
}

type TableContentProps = {
  items: Awaited<ReturnType<typeof getClearedStudents>>['items'];
};

function TableContent({ items }: TableContentProps) {
  return (
    <TableTbody>
      {items.map((it) => {
        if (it.payments.length === 0) {
          return (
            <TableTr key={it.stdNo}>
              <TableTd>{it.stdNo}</TableTd>
              <TableTd>{it.names}</TableTd>
              <TableTd>{it.program}</TableTd>
              <TableTd>{dateTime(it.dateRequested)}</TableTd>
              <TableTd>{dateTime(it.dateCleared)}</TableTd>
              <TableTd>{titleCase(it.clearedBy ?? 'Unknown')}</TableTd>
              <TableTd colSpan={3}>
                <Text size='sm' c='dimmed' ta='center'>
                  No payments
                </Text>
              </TableTd>
            </TableTr>
          );
        }

        return it.payments.map((payment, index) => (
          <TableTr key={`${it.stdNo}-${payment.receipt_no}`}>
            <TableTd>{index === 0 ? it.stdNo : ''}</TableTd>
            <TableTd>{index === 0 ? it.names : ''}</TableTd>
            <TableTd>{index === 0 ? it.program : ''}</TableTd>
            <TableTd>{index === 0 ? dateTime(it.dateRequested) : ''}</TableTd>
            <TableTd>{index === 0 ? dateTime(it.dateCleared) : ''}</TableTd>
            <TableTd>
              {index === 0 ? titleCase(it.clearedBy ?? 'Unknown') : ''}
            </TableTd>
            <TableTd>{payment.receipt_no}</TableTd>
            <TableTd>{payment.item}</TableTd>
            <TableTd>M {Number(payment.amount).toLocaleString()}</TableTd>
          </TableTr>
        ));
      })}
    </TableTbody>
  );
}

function titleCase(str: string) {
  return str
    .split(' ')
    .map(
      (word) =>
        word.charAt(0).toLocaleUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(' ');
}
