'use client';
import { graduatingStudents } from '@/db/schema';
import FormHeader from '@admin/components/FormHeader';
import useFormAction from '@admin/hooks/useFormAction';
import { NumberInput, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

type GraduatingStudent = typeof graduatingStudents.$inferSelect;

type Props = {
  value?: GraduatingStudent;
  onSubmit: (values: GraduatingStudent) => Promise<GraduatingStudent>;
};

const UserSchema = z.object({
  stdNo: z.string().regex(/^9010\d{5}$/),
});

export default function Form({ onSubmit, value }: Props) {
  const router = useRouter();
  const [pending, submitForm] = useFormAction();

  const { setValues, ...form } = useForm<GraduatingStudent>({
    initialValues: value,
    validate: zodResolver(UserSchema),
  });

  async function handleSubmit(values: GraduatingStudent) {
    submitForm(async () => {
      const { stdNo } = await onSubmit(values);
      router.push(`/admin/graduating-students/${stdNo}`);
    });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader title='Graduating Student' isLoading={pending} />
      <Stack p={'xl'}>
        <TextInput label='Student Number' {...form.getInputProps('stdNo')} />
      </Stack>
    </form>
  );
}
