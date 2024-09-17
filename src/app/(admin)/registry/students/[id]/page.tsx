import { Box, Fieldset, List, ListItem, Stack } from '@mantine/core';
import { notFound } from 'next/navigation';
import HeaderDisplay from '@admin/components/HeaderDisplay';
import DeleteIconButton from '@admin/components/DeleteIconButton';
import FieldView from '@admin/components/FieldView';
import { deleteStudent, getStudent } from '../actions';
import { dateTime } from '@/lib/format';

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
        title={item.name || item.stdNo.toString()}
        actionButtons={[<DeleteIconButton action={deleteStudent} id={id} />]}
      />

      <Stack p={'xl'}>
        <FieldView label='Student Number'>{item.stdNo}</FieldView>
        <FieldView label='Name'>{item.name}</FieldView>
        <FieldView label='Email'>{item.email}</FieldView>
        <FieldView label='National ID'>{item.nationalId}</FieldView>
        <FieldView label='Program'>{item.program}</FieldView>
        <FieldView label='Created At'>{dateTime(item.createdAt)}</FieldView>
      </Stack>
    </Box>
  );
}
