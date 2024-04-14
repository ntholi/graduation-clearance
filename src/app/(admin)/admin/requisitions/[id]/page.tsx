import DriveFiles from '@/app/(admin)/components/DriveFiles';
import FieldView from '@/app/(admin)/components/FieldView';
import HeaderDisplay from '@/app/(admin)/components/HeaderDisplay';
import { formatDate } from '@/lib/format';
import prisma from '@/lib/prisma';
import {
  Box,
  Fieldset,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import { RequisitionItem } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import PrintButton from './PrintButton';
import RequisitionPrint from './RequisitionPrint';

type Props = {
  params: {
    id: string;
  };
};
export default async function Page({ params: { id } }: Props) {
  const item = await prisma.requisition.findUnique({
    where: {
      id,
    },
    include: {
      documents: true,
      items: true,
    },
  });

  if (!item) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <HeaderDisplay
        title={item.title}
        actionButtons={[<PrintButton printable={<RequisitionPrint />} />]}
      />

      <Box p={'xl'}>
        <Stack>
          <FieldView label='Title' value={item.title} />
          <FieldView label='Status' value={item.description} />
          <FieldView label='Date' value={formatDate(item.date)} />
          <Fieldset legend='Requisition Items' mt={'md'}>
            <ItemsTable items={item.items} />
          </Fieldset>
          <DriveFiles
            legend='Documents'
            mt={'md'}
            documents={item.documents}
            onUpload={async (fileId, description) => {
              'use server';
              await prisma.document.create({
                data: {
                  driveId: fileId,
                  description,
                  requisitionId: id,
                },
              });
              revalidatePath(`/admin/requisitions/${id}`);
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}

function ItemsTable({ items }: { items: RequisitionItem[] }) {
  const rows = items.map((it) => (
    <TableTr key={it.id}>
      <TableTd>{it.description}</TableTd>
      <TableTd>{it.quantity}</TableTd>
      <TableTd>{`${it.unitPrice}`}</TableTd>
    </TableTr>
  ));
  return (
    <Table>
      <TableThead>
        <TableTr>
          <TableTh>Description</TableTh>
          <TableTh>Unit Price</TableTh>
          <TableTh>Quantity</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>{rows}</TableTbody>
    </Table>
  );
}
