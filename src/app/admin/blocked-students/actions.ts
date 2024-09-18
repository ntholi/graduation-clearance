'use server';

import db from '@/db';
import { blockedStudents, students } from '@/db/schema';
import { and, desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

type BlockedBy = (typeof blockedStudents.$inferSelect)['blockedBy'];
type Student = typeof blockedStudents.$inferInsert;

export async function getBlockedStudents(blockedBy: BlockedBy) {
  return await db
    .select({
      id: blockedStudents.id,
      stdNo: blockedStudents.stdNo,
      student: {
        name: students.name,
      },
    })
    .from(blockedStudents)
    .where(eq(blockedStudents.blockedBy, blockedBy))
    .leftJoin(students, eq(students.stdNo, blockedStudents.stdNo))
    .orderBy(desc(blockedStudents.createdAt));
}

export async function getBlockedStudent(id: string, blockedBy: BlockedBy) {
  const data = await db
    .select()
    .from(blockedStudents)
    .where(
      and(eq(blockedStudents.id, id), eq(blockedStudents.blockedBy, blockedBy)),
    )
    .leftJoin(students, eq(students.stdNo, blockedStudents.stdNo))
    .then((res) => res[0]);
  return {
    ...data.blocked_students,
    student: data?.students || null,
  };
}

export async function deleteBlockedStudent(id: string) {
  await db.delete(blockedStudents).where(eq(blockedStudents.id, id));
  revalidatePath('/admin/blocked-students/finance');
}

export async function updateBlockedStudent(id: string, values: Student) {
  const res = await db
    .update(blockedStudents)
    .set(values)
    .where(eq(blockedStudents.id, id))
    .returning()
    .then((it) => it[0]);
  revalidatePath(`/admin/blocked-students/finance/${id}`);
  return res;
}
