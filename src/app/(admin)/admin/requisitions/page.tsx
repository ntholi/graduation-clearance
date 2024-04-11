import {
  Button,
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  NavLink,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import React from 'react';
import SearchField from '../../components/SearchField';
import CreateButton from '../../components/CreateButton';
import { create } from './actions';
import prisma from '@/lib/prisma';

export default async function RequisitionPage() {
  const list = await prisma.requisition.findMany();
  return (
    <Grid columns={14} gutter={'xl'}>
      <GridCol span={{ base: 13, sm: 4 }} pr={{ base: 7, sm: 0 }}>
        <Paper withBorder>
          <Stack gap={0} w={'100%'}>
            <Flex p={'md'} justify='space-between'>
              <SearchField w={'72%'} />
              <CreateButton
                onCreate={create}
                title='Requisition'
                form={<Form />}
              />
            </Flex>
            <Divider />
            <ScrollArea h={{ base: 150, sm: '80vh' }} type='always' p={'sm'}>
              {list.map((item) => (
                <NavLink
                  key={item.id}
                  label={item.title}
                  href={`/admin/requisitions/${item.id}`}
                />
              ))}
            </ScrollArea>
          </Stack>
        </Paper>
      </GridCol>
      <GridCol span={{ base: 13, sm: 10 }}>
        <Paper withBorder>
          <ScrollArea h='88.5vh' type='always'>
            <Text>Here We Are</Text>
          </ScrollArea>
        </Paper>
      </GridCol>
    </Grid>
  );
}

function Form() {
  return (
    <>
      <TextInput name='title' label='Title' required />
    </>
  );
}
