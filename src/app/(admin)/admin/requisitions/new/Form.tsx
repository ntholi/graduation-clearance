'use client';
import FormHeader from '@/app/(admin)/components/FormHeader';
import { Stack, TextInput, Textarea } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Requisition } from '@prisma/client';
import { useTransition } from 'react';

type Props = {
  onSubmit: (values: Requisition) => Promise<void>;
};

export default function Form({ onSubmit }: Props) {
  const [sending, startTransition] = useTransition();
  const form = useForm<Requisition>({
    validate: {
      title: isNotEmpty('Title is required'),
    },
  });

  async function handleSubmit(values: Requisition) {
    console.log('Sending...');
    await onSubmit(values);
    console.log('Sent!');
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader title='Requisition' />
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
