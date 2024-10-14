import { getStudent } from '../actions';
import { dateTime } from '@/lib/format';
import FieldView from '@admin/components/FieldView';
import HeaderDisplay from '@admin/components/HeaderDisplay';
import { Box, Stack } from '@mantine/core';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};
export default async function Page({ params: { id } }: Props) {
  const item = await getStudent(id);
  if (!item) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <HeaderDisplay title={item.stdNo.toString()} />
      <Stack p={'xl'}>
        <FieldView label='Student Number'>{item.stdNo}</FieldView>
        <FieldView label='Name'>{item.name}</FieldView>
        <FieldView label='Program'>{item.program}</FieldView>
        <FieldView label='Date Cleared'>{dateTime(item.dateCleared)}</FieldView>
      </Stack>
    </Box>
  );
}
