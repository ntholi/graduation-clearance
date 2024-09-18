'use client';
import FormHeader from '@/app/(admin)/components/FormHeader';
import { students } from '@/db/schema';
import { NumberInput, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { z } from 'zod';

type Student = typeof students.$inferSelect;

type Props = {
  value?: Student;
  onSubmit: (values: Student) => Promise<Student>;
};

const UserSchema = z.object({
  stdNo: z.number().min(901000000),
  name: z.string().min(3),
  email: z.string().email(),
  nationalId: z.string(),
  program: z.string(),
  userId: z.string(),
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
      router.push(`/registry/students/${stdNo}`);
    });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader title='Student' isLoading={pending} />
      <Stack p={'xl'}>
        <NumberInput label='Student Number' {...form.getInputProps('stdNo')} />
        <TextInput label='Name' {...form.getInputProps('name')} />
        <TextInput label='Email' {...form.getInputProps('email')} />
        <TextInput label='National ID' {...form.getInputProps('nationalId')} />
        <TextInput label='Program' {...form.getInputProps('program')} />
        <TextInput label='User ID' {...form.getInputProps('userId')} />
      </Stack>
    </form>
  );
}
