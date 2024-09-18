import { Box } from '@mantine/core';
import { notFound } from 'next/navigation';
import Form from '../../Form';
import { getStudent, updateStudent } from '../../actions';

type Props = {
  params: {
    id: string;
  };
};

export default async function EditPage({ params: { id } }: Props) {
  const item = await getStudent(Number(id));
  if (!item) return notFound();

  return (
    <Box p={'lg'}>
      <Form
        value={item}
        onSubmit={async (value) => {
          'use server';
          const res = await updateStudent(Number(id), value);
          return res;
        }}
      />
    </Box>
  );
}
