'use server';

import db from '@/db';
import { blockedStudents } from '@/db/schema';
import { revalidatePath } from 'next/cache';

type Student = typeof blockedStudents.$inferInsert;

export async function createBlockedStudent(values: Student) {
  const res = await db
    .insert(blockedStudents)
    .values({
      ...values,
      blockedBy: 'finance',
    })
    .returning()
    .then((it) => it[0]);
  revalidatePath('/admin/blocked-students/finance');
  return res;
}
