import {
  deleteStudent,
  getStudent,
} from '@/app/admin/graduating-students/actions';
import { dateTime } from '@/lib/format';
import DeleteIconButton from '@admin/components/DeleteIconButton';
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
  const item = await getStudent(Number(id));
  if (!item) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <HeaderDisplay
        title={item.stdNo.toString()}
        actionButtons={[<DeleteIconButton action={deleteStudent} id={id} />]}
      />
      <Stack p={'xl'}>
        <FieldView label='Student Number'>{item.stdNo}</FieldView>
        <FieldView label='Created At'>{dateTime(item.createdAt)}</FieldView>
      </Stack>
    </Box>
  );
}
