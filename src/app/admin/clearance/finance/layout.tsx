import { PropsWithChildren } from 'react';
import ListPage from '@admin/components/ListPage';
import db from '@/db';
import { financeClearance, students } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

async function getClearanceList() {
  const list = await db
    .select()
    .from(financeClearance)
    .leftJoin(students, eq(students.stdNo, financeClearance.stdNo))
    .orderBy(desc(financeClearance.createdAt));
  return list.map((it) => ({
    ...it.finance_clearance,
    student: it.students,
  }));
}

export default async function Layout({ children }: PropsWithChildren) {
  const list = await getClearanceList();
  return (
    <ListPage
      includeNewLink={false}
      path='admin/financeClearance'
      nav={list.map((item) => ({
        label: item.stdNo,
        href: `/admin/financeClearance/${item.stdNo}`,
      }))}
    >
      {children}
    </ListPage>
  );
}
