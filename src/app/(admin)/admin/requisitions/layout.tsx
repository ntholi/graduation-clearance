import prisma from '@/lib/prisma';
import { NavLink } from '@mantine/core';
import { PropsWithChildren } from 'react';
import ListPage from '../../components/ListPage';
import Link from 'next/link';

export default async function Layout({ children }: PropsWithChildren) {
  const list = await prisma.requisition.findMany();
  return (
    <ListPage
      recourse='admin/requisitions'
      list={list.map((item) => (
        <NavLink
          component={Link}
          key={item.id}
          label={item.title}
          href={`/admin/requisitions/${item.id}`}
        />
      ))}
    >
      {children}
    </ListPage>
  );
}
