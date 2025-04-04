'use client';
import { students } from '@/db/schema';
import FormHeader from '@admin/components/FormHeader';
import useFormAction from '@admin/hooks/useFormAction';
import { Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

type Student = typeof students.$inferSelect;

type Props = {
  value?: Student;
  onSubmit: (values: Student) => Promise<Student>;
};

const UserSchema = z.object({
  stdNo: z.string().regex(/^9010\d{5}$/),
  name: z.string().min(3),
  email: z.string().email().optional(),
});

export default function Form({ onSubmit, value }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [pending, submitForm] = useFormAction();

  const { setValues, ...form } = useForm<Student>({
    initialValues: value,
    validate: zodResolver(UserSchema),
  });

  async function handleSubmit(values: Student) {
    submitForm(async () => {
      const { stdNo } = await onSubmit(values);
      router.push(`/admin/students/${stdNo}`);
    });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader title='Student' isLoading={pending} />
      <Stack p={'xl'}>
        <TextInput label='Student Number' {...form.getInputProps('stdNo')} />
        <TextInput label='Name' {...form.getInputProps('name')} />
        <TextInput label='Email' {...form.getInputProps('email')} />
        <TextInput label='National ID' {...form.getInputProps('nationalId')} />
        <TextInput label='Program' {...form.getInputProps('program')} />
        <TextInput
          label='User ID'
          {...form.getInputProps('userId')}
          disabled={session?.user?.role !== 'admin'}
        />
      </Stack>
    </form>
  );
}
