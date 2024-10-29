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
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';
import { countClearedStudents, getClearedStudents } from './actions';
import { exportToExcel } from './export';
export default function Page() {
  const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger);

  const { data: counts } = useQuery({
    queryKey: ['clearance-counts'],
    queryFn: () => countClearedStudents(),
  });

  const { data, isLoading } = useQuery({
    queryKey: ['clearance-responses', currentPage],
    queryFn: () => getClearedStudents(currentPage ?? 1),
  });

  return (
    <Stack>
      <Paper withBorder p='md'>
        <Flex justify='space-between'>
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
          <Button onClick={exportToExcel}>Export</Button>
        </Flex>
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
  items: Awaited<ReturnType<typeof getClearedStudents>>['items'];
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
