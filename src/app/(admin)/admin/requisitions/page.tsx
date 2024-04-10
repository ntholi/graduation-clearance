import {
  Button,
  Divider,
  Flex,
  Grid,
  GridCol,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import React from 'react';
import SearchField from '../../components/SearchField';
import CreateButton from '../../components/CreateButton';
import DeleteIconButton from '../../components/DeleteIconButton';
import { create } from './actions';

export default function RequisitionPage() {
  return (
    <Grid columns={14} gutter={'xl'}>
      <GridCol span={{ base: 13, sm: 4 }} pr={{ base: 7, sm: 0 }}>
        <Paper withBorder>
          <Flex>
            <Stack gap={0} w={'100%'}>
              <Flex h={60} py='md' justify='space-between' pe={'md'}>
                <SearchField />
                <CreateButton
                  onCreate={create}
                  title='Requisition'
                  form={<Form />}
                />
              </Flex>
              <Divider />
              <ScrollArea h={{ base: 150, sm: '71vh' }} type='always' p={'sm'}>
                <Text>Here We Are</Text>
              </ScrollArea>
            </Stack>
          </Flex>
        </Paper>
      </GridCol>
      <GridCol span={{ base: 13, sm: 10 }}>
        <Paper withBorder>
          <ScrollArea h='78vh' type='always'>
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
