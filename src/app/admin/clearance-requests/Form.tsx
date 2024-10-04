'use client';
import { departmentEnum } from '@/db/schema';
import FormHeader from '@admin/components/FormHeader';
import useFormAction from '@admin/hooks/useFormAction';
import { Chip, Divider, Group, Radio, Stack, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import FieldView from '../components/FieldView';
import { Responder } from './actions';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const ClearanceResponseSchema = z.object({
  status: z.enum(['cleared', 'blocked']),
  responder: z.enum(departmentEnum.enumValues),
  reasonBlocked: z.string().optional(),
});

type Response = z.infer<typeof ClearanceResponseSchema>;

type Props = {
  responder: Responder;
  student: {
    stdNo: string;
    name?: string | null;
    program?: string | null;
  };
  onSubmit: (values: Response) => Promise<void>;
};

export default function Form({ onSubmit, student, responder }: Props) {
  const router = useRouter();
  const [pending, submitForm] = useFormAction();
  const queryClient = useQueryClient();

  const { setValues, ...form } = useForm<Response>({
    validate: zodResolver(ClearanceResponseSchema),
  });

  useEffect(() => {
    setValues({
      responder: responder,
    });
  }, [responder]);

  async function handleSubmit(values: Response) {
    submitForm(async () => {
      await onSubmit(values);
      queryClient.invalidateQueries({ queryKey: ['unattended-requests'] });
      router.push('/admin/clearance-requests');
    });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader
        title={`${student.stdNo} (${student.name})`}
        isLoading={pending}
      />
      <Stack p={'xl'} pt={'lg'}>
        <FieldView label='Student Number'>{student.stdNo}</FieldView>
        <FieldView label='Program'>{student.program}</FieldView>
        <Chip.Group {...form.getInputProps('status')}>
          <Group>
            <Chip value='cleared'>Cleared</Chip>
            <Chip value='blocked'>Blocked</Chip>
          </Group>
        </Chip.Group>
        <Radio.Group
          hidden={responder !== 'admin'}
          label='Responder'
          {...form.getInputProps('responder')}
        >
          <Stack gap={'xs'}>
            {departmentEnum.enumValues.map((value) => (
              <Radio label={formatResponder(value)} key={value} value={value} />
            ))}
          </Stack>
        </Radio.Group>
        <Textarea
          disabled={form.values.status !== 'blocked'}
          label='Reason Blocked'
          placeholder='Optional'
          rows={3}
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
