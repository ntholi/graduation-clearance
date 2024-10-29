'use client';

import { dateTime } from '@/lib/format';
import {
  Box,
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
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';
import { countBlockedStudents, getBlockedStudents } from './actions';

export default function Page() {
  const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger);

  const { data: counts } = useQuery({
    queryKey: ['blocked-counts'],
    queryFn: () => countBlockedStudents(),
  });

  const { data, isLoading } = useQuery({
    queryKey: ['blocked-students', currentPage],
    queryFn: () => getBlockedStudents(currentPage ?? 1),
  });

  return (
    <Stack>
      <Paper withBorder p='md'>
        <Title fw={'lighter'} order={3}>
          Blocked Students
        </Title>
        <Group mt='xs'>
          <Text size='sm'>
            <Text span fw={500}>
              {counts ?? '?'}
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
                <TableTh>Date Blocked</TableTh>
                <TableTh>Blocked By</TableTh>
                <TableTh>Reason</TableTh>
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
        </Paper>
      </Table>
    </Stack>
  );
}

type TableContentProps = {
  items: Awaited<ReturnType<typeof getBlockedStudents>>['items'];
};

function TableContent({ items }: TableContentProps) {
  return (
    <TableTbody>
      {items.map((it) => (
        <TableTr key={it.stdNo}>
          <TableTd>{it.stdNo}</TableTd>
          <TableTd>{it.names}</TableTd>
          <TableTd>{it.program}</TableTd>
          <TableTd>{dateTime(it.dateBlocked)}</TableTd>
          <TableTd>{titleCase(it.blockedBy ?? 'Unknown')}</TableTd>
          <TableTd>{it.reason}</TableTd>
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
