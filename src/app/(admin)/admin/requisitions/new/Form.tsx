'use client';
import { Stack, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

export default function Form() {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
