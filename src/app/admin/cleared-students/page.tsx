'use client';

import { dateTime } from '@/lib/format';
import {
  Center,
  Loader,
  Pagination,
  Paper,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Title,
  Text,
  Group,
  Box,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';
import { countClearedStudents, getClearanceResponses } from './actions';

export default function Page() {
  const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger);

  const { data: counts } = useQuery({
    queryKey: ['clearance-counts'],
    queryFn: () => countClearedStudents(),
  });

  const { data, isLoading } = useQuery({
    queryKey: ['clearance-responses', currentPage],
    queryFn: () => getClearanceResponses(currentPage ?? 1),
  });

  return (
    <Stack>
      <Paper withBorder p='md'>
        <Title fw={'lighter'} order={3}>
          Cleared Students
        </Title>
        <Group mt='xs'>
          <Text size='sm'>
            <Text span fw={500}>
              {counts?.cleared ?? '?'}
            </Text>{' '}
            students cleared
          </Text>
          |
          <Text size='sm' c='red'>
            <Text span fw={500}>
              {counts?.blocked ?? '?'}
            </Text>{' '}
            students blocked
          </Text>
        </Group>
      </Paper>
      <Table>
        <Paper withBorder p='md'>
          <Table>
            <TableThead>
              <TableTr>
                <TableTh>Student No</TableTh>
                <TableTh>Names</TableTh>
                <TableTh>Programme</TableTh>
                <TableTh>Date Requested</TableTh>
                <TableTh>Date Cleared</TableTh>
                <TableTh>Cleared By</TableTh>
              </TableTr>
            </TableThead>
            {isLoading ? (
              <Box py={'md'} px={'sm'}>
                <Text>Loading...</Text>
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
        </Paper>
      </Table>
    </Stack>
  );
}

type TableContentProps = {
  items: Awaited<ReturnType<typeof getClearanceResponses>>['items'];
};

function TableContent({ items }: TableContentProps) {
  return (
    <TableTbody>
      {items.map((it) => (
        <TableTr key={it.stdNo}>
          <TableTd>{it.stdNo}</TableTd>
          <TableTd>{it.names}</TableTd>
          <TableTd>{it.program}</TableTd>
          <TableTd>{dateTime(it.dateRequested)}</TableTd>
          <TableTd>{dateTime(it.dateCleared)}</TableTd>
          <TableTd>{titleCase(it.clearedBy ?? 'Unknown')}</TableTd>
        </TableTr>
      ))}
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
