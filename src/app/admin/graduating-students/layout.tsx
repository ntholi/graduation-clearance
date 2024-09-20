import db from '@/db';
import { graduatingStudents, students } from '@/db/schema';
import ListPage from '@admin/components/ListPage';
import { desc, eq } from 'drizzle-orm';
import { PropsWithChildren } from 'react';
import SheetReader from './SheetReader';

async function getClearanceList() {
  const list = await db
    .select()
    .from(graduatingStudents)
    .leftJoin(students, eq(students.stdNo, graduatingStudents.stdNo))
    .orderBy(desc(graduatingStudents.createdAt));
  return list.map((it) => ({
    ...it.graduating_students,
    student: it.students,
  }));
}

export default async function Layout({ children }: PropsWithChildren) {
  const list = await getClearanceList();

  return (
    <ListPage
      path='admin/graduating-students'
      nav={list.map((item) => ({
        label: item.stdNo,
        href: `/admin/graduating-students/${item.stdNo}`,
      }))}
      actionIcons={[<SheetReader />]}
    >
      {children}
    </ListPage>
  );
}
