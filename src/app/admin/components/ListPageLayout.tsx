'use client';
import { Grid, GridCol, Paper, ScrollArea } from '@mantine/core';
import React from 'react';

type Props = {
  children: React.ReactNode;
  items: React.ReactNode;
};

export default function ListPageLayout({ children, items }: Props) {
  return (
    <Grid columns={14} gutter={'xl'}>
      <GridCol span={4} pr={7}>
        <Paper withBorder h={'88vh'}>
          {items}
        </Paper>
      </GridCol>

      <GridCol span={10}>
        <Paper withBorder>
          <ScrollArea h='88vh' type='always'>
            {children}
          </ScrollArea>
        </Paper>
      </GridCol>
    </Grid>
  );
}
