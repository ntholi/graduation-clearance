'use client';
import FormHeader from '@admin/components/FormHeader';
import useFormAction from '@admin/hooks/useFormAction';
import {
  Badge,
  Box,
  Chip,
  Divider,
  Fieldset,
  Group,
  SegmentedControl,
  Stack,
  Textarea,
  TextInput,
  Text,
  Radio,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import FieldView from '../components/FieldView';
import { responderEnum } from '@/db/schema';
import { Responder } from './actions';

export const ClearanceResponseSchema = z.object({
  status: z.enum(['cleared', 'blocked']),
  responder: z.enum(responderEnum.enumValues),
  reasonBlocked: z.string().optional(),
});

type Response = z.infer<typeof ClearanceResponseSchema>;

type Props = {
  requestId: number;
  student: {
    stdNo: string;
    name?: string | null;
  };
  onSubmit: (values: Response) => Promise<void>;
};

export default function Form({ onSubmit, student, requestId }: Props) {
  const router = useRouter();
  const [pending, submitForm] = useFormAction();

  const { setValues, ...form } = useForm<Response>({
    validate: zodResolver(ClearanceResponseSchema),
  });

  async function handleSubmit(values: Response) {
    submitForm(async () => {
      await onSubmit(values);
      router.push('/admin/clearance-requests');
    });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader
        title={`${student.stdNo} (${student.name})`}
        isLoading={pending}
      />
      <Stack p={'xl'}>
        <FieldView label='Student Number'>{student.stdNo}</FieldView>

        <Radio.Group label='Responder' {...form.getInputProps('responder')}>
          <Group>
            {responderEnum.enumValues.map((value) => (
              <Radio label={formatResponder(value)} key={value} value={value} />
            ))}
          </Group>
        </Radio.Group>
        <Chip.Group {...form.getInputProps('status')}>
          <Group>
            <Chip value='cleared'>Cleared</Chip>
            <Chip value='blocked'>Blocked</Chip>
          </Group>
        </Chip.Group>
        <Textarea
          disabled={form.values.status !== 'blocked'}
          label='Reason Blocked'
          placeholder='Optional'
          rows={5}
          {...form.getInputProps('reasonBlocked')}
        />
      </Stack>
    </form>
  );
}

function formatResponder(responder: Responder) {
  if (responder === 'it') return 'IT';
  return responder.at(0)?.toLocaleUpperCase() + responder.slice(1);
}
