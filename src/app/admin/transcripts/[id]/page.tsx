import { dateTime } from '@/lib/format';
import DeleteIconButton from '@admin/components/DeleteIconButton';
import FieldView from '@admin/components/FieldView';
import HeaderDisplay from '@admin/components/HeaderDisplay';
import {
  ActionIcon,
  Anchor,
  Box,
  Divider,
  Flex,
  Group,
  Stack,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { deleteStudent, getStudent } from '../actions';
import { PrinterIcon } from 'lucide-react';

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
      <Flex justify={'space-between'} align={'center'}>
        <Title order={3} fw={100}>
          Transcript
        </Title>
        <Group>
          <ActionIcon size={'lg'} variant='default'>
            <PrinterIcon size={'1.1rem'} />
          </ActionIcon>
        </Group>
      </Flex>
      <Divider my={15} />

      <Stack p={'xl'}></Stack>
    </Box>
  );
}
