import { PropsWithChildren } from 'react';
import ListPage from '@admin/components/ListPage';
import db from '@/db';
import { students } from '@/db/schema';
import { desc } from 'drizzle-orm';

export default async function Layout({ children }: PropsWithChildren) {
  const list = await db
    .select()
    .from(students)
    .orderBy(desc(students.createdAt));

  return (
    <ListPage
      path='admin/students'
      nav={list.map((item) => ({
        label: item.name,
        href: `/admin/students/${item.stdNo}`,
      }))}
    >
      {children}
    </ListPage>
  );
}
