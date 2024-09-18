'use client';
import FormHeader from '@/app/(admin)/components/FormHeader';
import { blockedStudents } from '@/db/schema';
import { NumberInput, Stack } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { z } from 'zod';

type Student = typeof blockedStudents.$inferSelect;

type Props = {
  value?: Student;
  onSubmit: (values: Student) => Promise<Student>;
};

const UserSchema = z.object({
  stdNo: z.number().min(901000000),
});

export default function Form({ onSubmit, value }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const { setValues, ...form } = useForm<Student>({
    initialValues: value,
    validate: zodResolver(UserSchema),
  });

  async function handleSubmit(values: Student) {
    startTransition(async () => {
      const { stdNo } = await onSubmit(values);
      router.push(`/finance/blocked-students/finance/${stdNo}`);
    });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader title='Blocked Student' isLoading={pending} />
      <Stack p={'xl'}>
        <NumberInput label='Student Number' {...form.getInputProps('stdNo')} />
      </Stack>
    </form>
  );
}
