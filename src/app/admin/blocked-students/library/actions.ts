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
      blockedBy: 'library',
    })
    .returning()
    .then((it) => it[0]);
  revalidatePath('/admin/blocked-students/library');
  revalidatePath(`/admin/blocked-students/library/${res.id}`);
  return res;
}
