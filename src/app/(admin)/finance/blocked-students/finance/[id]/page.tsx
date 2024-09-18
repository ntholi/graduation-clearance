import { dateTime } from '@/lib/format';
import FieldView from '@admin/components/FieldView';
import HeaderDisplay from '@admin/components/HeaderDisplay';
import { Box, Stack } from '@mantine/core';
import { notFound } from 'next/navigation';
import { getBlockedStudent } from '../../actions';

type Props = {
  params: {
    id: string;
  };
};
export default async function Page({ params: { id } }: Props) {
  const item = await getBlockedStudent(Number(id), 'finance');
  if (!item) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <HeaderDisplay
        title={item.student?.name || item.stdNo.toString()}
        // actionButtons={[<DeleteIconButton action={deleteStudent} id={id} />]}
      />

      <Stack p={'xl'}>
        <FieldView label='Student Number'>{item.stdNo}</FieldView>
        <FieldView label='Name'>{item.student?.name}</FieldView>
        <FieldView label='Created At'>{dateTime(item.createdAt)}</FieldView>
      </Stack>
    </Box>
  );
}
