'use client';
import { financePayments } from '@/db/schema';
import FormHeader from '@admin/components/FormHeader';
import useFormAction from '@admin/hooks/useFormAction';
import { NumberInput, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

type Payment = typeof financePayments.$inferInsert;

type Props = {
  value?: Payment;
  onSubmit: (values: Payment) => Promise<Payment>;
};

const PaymentSchema = z.object({
  stdNo: z.string().regex(/^9010\d{5}$/),
  amount: z.number().min(1),
  receiptNo: z.string().min(1),
  item: z.string().min(1),
});

export default function Form({ onSubmit, value }: Props) {
  const router = useRouter();
  const [pending, submitForm] = useFormAction();

  const { setValues, ...form } = useForm<Payment>({
    initialValues: value,
    validate: zodResolver(PaymentSchema),
  });

  async function handleSubmit(values: Payment) {
    submitForm(async () => {
      await onSubmit(values);
      router.push(`/admin/payments/`);
    });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader title='Payment' isLoading={pending} />
      <Stack p={'xl'}>
        <TextInput label='Student Number' {...form.getInputProps('stdNo')} />
        <NumberInput label='Amount' {...form.getInputProps('amount')} />
        <TextInput label='Receipt No' {...form.getInputProps('receiptNo')} />
        <TextInput label='Item' {...form.getInputProps('item')} />
      </Stack>
    </form>
  );
}
