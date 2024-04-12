'use client';
import FormHeader from '@/app/(admin)/components/FormHeader';
import { Stack, TextInput, Textarea } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Requisition } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

type Props = {
  onSubmit: (values: Requisition) => Promise<Requisition>;
};

export default function Form({ onSubmit }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const form = useForm<Requisition>({
    validate: {
      title: isNotEmpty('Title is required'),
    },
  });

  async function handleSubmit(values: Requisition) {
    startTransition(async () => {
      const { id } = await onSubmit(values);
      router.push(`/admin/requisitions/${id}`);
    });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader title='Requisition' isLoading={pending} />
      <Stack p={'xl'}>
        <TextInput label='Title' {...form.getInputProps('title')} />
        <Textarea
          label='Description'
          rows={3}
          {...form.getInputProps('description')}
        />
      </Stack>
    </form>
  );
}
