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
} from '@mantine/core';
import { getClearanceResponses } from './actions';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['clearance-responses', currentPage],
    queryFn: () => getClearanceResponses(currentPage),
  });

  return (
    <Paper withBorder p='md'>
      <Table>
        <TableCaption>Cleared Students</TableCaption>
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

      <Group justify='center' mt='xl'>
        <Pagination
          total={data?.pages ?? 0}
          value={currentPage}
          onChange={setCurrentPage}
        />
      </Group>
    </Paper>
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
