import { dateTime } from '@/lib/format';
import DeleteIconButton from '@admin/components/DeleteIconButton';
import FieldView from '@admin/components/FieldView';
import HeaderDisplay from '@admin/components/HeaderDisplay';
import { Anchor, Box, Stack } from '@mantine/core';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { deleteStudent, getStudent } from '../actions';

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
        <FieldView label='National ID'>{item.nationalId}</FieldView>
        <FieldView label='Program'>{item.program}</FieldView>
        <FieldView label='User'>
          <Anchor component={Link} href={`/admin/users/${item.userId}`}>
            {item.userId}
          </Anchor>
        </FieldView>
        <FieldView label='Created At'>{dateTime(item.createdAt)}</FieldView>
      </Stack>
    </Box>
  );
}
