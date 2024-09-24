import HeaderDisplay from '@admin/components/HeaderDisplay';
import { Box, Title } from '@mantine/core';
import { notFound } from 'next/navigation';
import { blockStudent, deleteClearance, getClearance } from '../actions';
import Form from '../Form';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Props) {
  const item = await getClearance(id);
  if (!item) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <Form
        student={{ stdNo: item.stdNo, name: item.student?.name }}
        onSubmit={async (value) => {
          'use server';
          if (value.status === 'blocked') {
            await blockStudent(item.stdNo, value.reason);
          }
          await deleteClearance(item.stdNo);
        }}
      />
    </Box>
  );
}
