import { auth } from '@/auth';
import { Box } from '@mantine/core';
import { notFound } from 'next/navigation';
import Form from '../Form';
import { getRequest, Responder, respondToRequest } from '../actions';
import PaymentsDisplay from './PaymentsDisplay';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Props) {
  const session = await auth();
  let responder: Responder = session?.user?.role as Responder;
  const item = await getRequest(id, responder);

  if (!item) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <Form
        responder={responder}
        student={{ stdNo: item.stdNo, ...item.student }}
        onSubmit={async (value) => {
          'use server';
          await respondToRequest(item.stdNo, item.id, {
            responder: value.responder,
            status: value.status,
            reasonBlocked: value.reasonBlocked,
          });
        }}
      />
      {responder === 'finance' || responder === 'admin' ? (
        <Box px={'xl'}>
          <PaymentsDisplay stdNo={item.stdNo} />
        </Box>
      ) : null}
    </Box>
  );
}
