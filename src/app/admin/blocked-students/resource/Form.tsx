'use client';
import { blockedStudents } from '@/db/schema';
import FormHeader from '@admin/components/FormHeader';
import { NumberInput, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import useFormAction from '../../hooks/useFormAction';

type Student = typeof blockedStudents.$inferSelect;

type Props = {
  value?: Student;
  onSubmit: (values: Student) => Promise<Student>;
};

const UserSchema = z.object({
  stdNo: z.string().regex(/^9010\d{5}$/),
});

export default function Form({ onSubmit, value }: Props) {
  const router = useRouter();
  const [pending, submitForm] = useFormAction();

  const { setValues, ...form } = useForm<Student>({
    initialValues: value,
    validate: zodResolver(UserSchema),
  });

  async function handleSubmit(values: Student) {
    submitForm(async () => {
      const { id } = await onSubmit(values);
      router.push(`/admin/blocked-students/resource/${id}`);
    });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader title='Blocked Student' isLoading={pending} />
      <Stack p={'xl'}>
        <TextInput label='Student Number' {...form.getInputProps('stdNo')} />
        <Textarea
          rows={4}
          label='Reason'
          description='Reason for blocking this student (optional)'
          {...form.getInputProps('reason')}
        />
      </Stack>
    </form>
  );
}
