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
  Flex,
  TextInput,
  Divider,
  CloseButton,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';
import { countBlockedStudents, getBlockedStudents } from './actions';
import { exportToExcel } from './export';
import ExportButton from '../ExportButton';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export default function Page() {
  const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data: counts } = useQuery({
    queryKey: ['blocked-counts'],
    queryFn: () => countBlockedStudents(),
  });

  const { data, isLoading } = useQuery({
    queryKey: ['blocked-students', currentPage, debouncedSearch],
    queryFn: () => getBlockedStudents(currentPage ?? 1, debouncedSearch),
  });

  return (
    <Stack>
      <Paper withBorder p='md'>
        <Flex justify='space-between' align='end'>
          <div>
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
        <Table.ScrollContainer minWidth={1200}>
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
        </Table.ScrollContainer>
      </Paper>
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
