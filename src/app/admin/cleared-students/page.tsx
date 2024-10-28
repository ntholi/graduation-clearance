'use client';

import { dateTime } from '@/lib/format';
import {
  Paper,
  Table,
  TableCaption,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Pagination,
  Group,
  Center,
  Loader,
  Stack,
  Title,
} from '@mantine/core';
import { getClearanceResponses } from './actions';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { parseAsInteger, useQueryState } from 'nuqs';

export default function Page() {
  const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger);

  const { data, isLoading } = useQuery({
    queryKey: ['clearance-responses', currentPage],
    queryFn: () => getClearanceResponses(currentPage ?? 1),
  });

  return (
    <Stack>
      <Title fw={'lighter'} order={2}>
        Cleared Students
      </Title>
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
              <Center>
                <Loader />
              </Center>
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
          <TableTd>{it.clearedBy}</TableTd>
        </TableTr>
      ))}
    </TableTbody>
  );
}
