'use server';

import db from '@/db';
import { blockedStudents, students } from '@/db/schema';
import { and, count, desc, eq, like } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

type Department = (typeof blockedStudents.$inferSelect)['department'];
type Student = typeof blockedStudents.$inferInsert;

const ITEMS_PER_PAGE = 15;

export async function getBlockedStudents(
  department: Department,
  page = 1,

  search = '',
) {
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const list = await db
    .select({
      id: blockedStudents.id,
      stdNo: blockedStudents.stdNo,
      student: {
        name: students.name,
      },
    })
    .from(blockedStudents)
    .where(
      and(
        eq(blockedStudents.department, department),
        eq(blockedStudents.status, 'unblocked'),
        like(blockedStudents.stdNo, `%${search}%`),
      ),
    )
    .leftJoin(students, eq(students.stdNo, blockedStudents.stdNo))
    .orderBy(desc(blockedStudents.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  const totalCount = await db
    .select({ count: count() })
    .from(blockedStudents)
    .then((it) => it[0].count);

  return {
    items: list.map((it) => ({
      ...it,
    })),
    pages: Math.ceil(totalCount / ITEMS_PER_PAGE),
  };
}

export async function getBlockedStudent(id: string, department: Department) {
  const data = await db
    .select()
    .from(blockedStudents)
    .where(
      and(
        eq(blockedStudents.id, id),
        eq(blockedStudents.department, department),
      ),
    )
    .leftJoin(students, eq(students.stdNo, blockedStudents.stdNo))
    .then((res) => res[0]);
  return {
    ...data.blocked_students,
    student: data?.students || null,
  };
}

export async function deleteBlockedStudent(id: string) {
  const res = await db
    .delete(blockedStudents)
    .where(eq(blockedStudents.id, id))
    .returning()
    .then((it) => it[0]);
  revalidatePath(`/admin/blocked-students/${res.department}`);
}

export async function updateBlockedStudent(id: string, values: Student) {
  const res = await db
    .update(blockedStudents)
    .set(values)
    .where(eq(blockedStudents.id, id))
    .returning()
    .then((it) => it[0]);
  revalidatePath(`/admin/blocked-students/${res.department}`);
  revalidatePath(`/admin/blocked-students/${res.department}/${id}`);
  return res;
}
