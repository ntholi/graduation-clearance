'use client';
import FormHeader from '@/app/(admin)/components/FormHeader';
import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  Group,
  NumberInput,
  Paper,
  Stack,
  Table,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Requisition, RequisitionItem } from '@prisma/client';
import { IconTrashFilled } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type Props = {
  onSubmit: (
    values: Requisition & {
      items: RequisitionItem[];
    }
  ) => Promise<Requisition>;
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
      const { id } = await onSubmit(Object.assign(values, { items }));
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
      form.setValues({
        description: '',
        unitPrice: undefined,
        quantity: undefined,
      });
    }
  }

  const rows = items.map((it) => (
    <Table.Tr key={it.id}>
      <Table.Td>{it.description}</Table.Td>
      <Table.Td>{it.quantity}</Table.Td>
      <Table.Td>{`${it.unitPrice}`}</Table.Td>
      <Table.Td>
        <ActionIcon
          color='red'
          variant='light'
          onClick={() => {
            setItems((prev) => prev.filter((item) => item.id !== it.id));
          }}
        >
          <IconTrashFilled size={'1rem'} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper mt={'lg'} p={'sm'} pb={'xl'} withBorder>
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
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Description</Table.Th>
            <Table.Th>Unit Price</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}
