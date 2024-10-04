import { dateTime } from '@/lib/format';
import FieldView from '@admin/components/FieldView';
import HeaderDisplay from '@admin/components/HeaderDisplay';
import { Box, Divider, Stack, Text } from '@mantine/core';
import { notFound } from 'next/navigation';
import { deleteBlockedStudent, getBlockedStudent } from '../../actions';
import DeleteIconButton from '@admin/components/DeleteIconButton';
import PublishSwitch from '../../UnblockSwitch';
import StudentDisplay from '../../StudentDisplay';

type Props = {
  params: {
    id: string;
  };
};
export default async function Page({ params: { id } }: Props) {
  const item = await getBlockedStudent(id, 'resource');
  if (!item) {
    return notFound();
  }

  return <StudentDisplay blockedStudent={item} />;
}
