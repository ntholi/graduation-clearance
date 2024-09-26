import HeaderDisplay from '@admin/components/HeaderDisplay';
import { Box, Title } from '@mantine/core';
import { notFound } from 'next/navigation';
import Form from '../Form';
import { getRequest, respondToRequest } from '../actions';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Props) {
  const item = await getRequest(id, 'finance');
  if (!item) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <Form
        requestId={item.id}
        student={{ stdNo: item.stdNo, name: item.student?.name }}
        onSubmit={async (value) => {
          'use server';
          await respondToRequest(item.stdNo, item.id, {
            responder: value.responder,
            status: value.status,
            reasonBlocked: value.reasonBlocked,
          });
        }}
      />
    </Box>
  );
}
