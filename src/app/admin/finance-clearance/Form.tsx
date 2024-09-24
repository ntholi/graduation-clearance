'use client';
import FormHeader from '@admin/components/FormHeader';
import useFormAction from '@admin/hooks/useFormAction';
import {
  Box,
  Divider,
  Fieldset,
  SegmentedControl,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import FieldView from '../components/FieldView';

export const FinanceClearanceSchema = z.object({
  status: z.enum(['pending', 'cleared', 'blocked']),
  reason: z.string().optional(),
});

type Clearance = z.infer<typeof FinanceClearanceSchema>;

type Props = {
  student: {
    stdNo: string;
    name?: string | null;
  };
  onSubmit: (values: Clearance) => Promise<void>;
};

export default function Form({ onSubmit, student }: Props) {
  const router = useRouter();
  const [pending, submitForm] = useFormAction();

  const { setValues, ...form } = useForm<Clearance>({
    validate: zodResolver(FinanceClearanceSchema),
  });

  async function handleSubmit(values: Clearance) {
    submitForm(async () => {
      await onSubmit(values);
      router.push('/admin/finance-clearance');
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
        <SegmentedControl
          w={400}
          color='blue'
          data={[
            { value: 'cleared', label: 'Cleared' },
            { value: 'blocked', label: 'Blocked' },
          ]}
          {...form.getInputProps('status')}
        />
        <Textarea
          label='Reason'
          placeholder='Optional'
          rows={5}
          {...form.getInputProps('reason')}
        />
      </Stack>
    </form>
  );
}
