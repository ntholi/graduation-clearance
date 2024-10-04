import { dateTime } from '@/lib/format';
import DeleteIconButton from '@admin/components/DeleteIconButton';
import FieldView from '@admin/components/FieldView';
import HeaderDisplay from '@admin/components/HeaderDisplay';
import { Box, Divider, Stack, Text } from '@mantine/core';
import { deleteBlockedStudent } from './actions';
import PublishSwitch from './UnblockSwitch';
import { blockedStudents } from '@/db/schema';

type BlockedStudent = typeof blockedStudents.$inferSelect & {
  student?: {
    name: string | null;
  } | null;
};

type Props = {
  blockedStudent: BlockedStudent;
};

export default function StudentDisplay({ blockedStudent }: Props) {
  const { id, student, stdNo, reason, createdAt } = blockedStudent;
  return (
    <Box p={'lg'}>
      <HeaderDisplay
        title={student?.name || stdNo.toString()}
        actionButtons={[
          <DeleteIconButton action={deleteBlockedStudent} id={id} />,
        ]}
      />

      <Stack p={'xl'}>
        <PublishSwitch blockedStudent={blockedStudent} />
        <Divider />
        <FieldView label='Student Number'>{stdNo}</FieldView>
        <FieldView label='Name'>{student?.name}</FieldView>
        <FieldView label='Reason'>
          <Text size='sm'>{reason}</Text>
        </FieldView>
        <FieldView label='Blocked At'>{dateTime(createdAt)}</FieldView>
      </Stack>
    </Box>
  );
}
