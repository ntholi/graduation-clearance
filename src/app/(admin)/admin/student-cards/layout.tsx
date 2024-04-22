import prisma from '@/lib/prisma';
import { PropsWithChildren } from 'react';
import ListPage from '../../components/ListPage';

export default async function Layout({ children }: PropsWithChildren) {
  const list = await prisma.requisition.findMany();
  return (
    <ListPage
      path='admin/requisitions'
      nav={list.map((item) => ({
        label: item.title,
        href: `/admin/requisitions/${item.id}`,
      }))}
    >
      {children}
    </ListPage>
  );
}
