'use client';
import FormHeader from '@/app/(admin)/components/FormHeader';
import {
  Button,
  Divider,
  Flex,
  Group,
  NumberInput,
  Paper,
  Stack,
  TextInput,
  Textarea,
  Title,
  TableData,
  Table,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Requisition, RequisitionItem } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type Props = {
  onSubmit: (values: Requisition) => Promise<Requisition>;
};

export default function Form({ onSubmit }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [items, setItems] = useState<RequisitionItem[]>([]);
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
        <ItemsInput items={items} setItems={setItems} />
      </Stack>
    </form>
  );
}

type ItemsInputProps = {
  items: RequisitionItem[];
  setItems: React.Dispatch<React.SetStateAction<RequisitionItem[]>>;
};

function ItemsInput({ items, setItems }: ItemsInputProps) {
  const form = useForm<RequisitionItem>();

  function handleSubmit() {
    console.log(form.validate());
    if (!form.validate().hasErrors) {
      setItems((prev) => [...prev, form.values]);
      form.reset();
    }
  }

  const tableData: TableData = {
    head: ['Description', 'Unit Price', 'Quantity'],
    body: items.map((item) => [
      `${item.description}`,
      `${item.unitPrice}`,
      `${item.quantity}`,
    ]),
  };

  return (
    <Paper p={'sm'} pb={'xl'} withBorder>
      <Title order={4} fw={100} mb={5}>
        Items
      </Title>
      <Divider />
      <form>
        <Flex mt={'lg'} justify='space-between' align={'center'}>
          <Group>
            <TextInput
              placeholder='Description'
              {...form.getInputProps('description')}
            />
            <NumberInput
              placeholder='Unit Price'
              {...form.getInputProps('unitPrice')}
            />
            <NumberInput
              placeholder='Quantity'
              {...form.getInputProps('quantity')}
            />
          </Group>
          <Button variant='default' onClick={handleSubmit}>
            Add
          </Button>
        </Flex>
      </form>
      <Divider my={15} />
      <Table data={tableData} />
    </Paper>
  );
}
