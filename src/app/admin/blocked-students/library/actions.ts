'use server';

import { auth } from '@/auth';
import db from '@/db';
import { blockedStudents } from '@/db/schema';
import { revalidatePath } from 'next/cache';

type Student = typeof blockedStudents.$inferInsert;

export async function createBlockedStudent(values: Student) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error('Unauthorized');
  }
  const res = await db
    .insert(blockedStudents)
    .values({
      ...values,
      department: 'library',
      createdBy: session.user.id,
    })
    .returning()
    .then((it) => it[0]);
  revalidatePath('/admin/blocked-students/library');
  revalidatePath(`/admin/blocked-students/library/${res.id}`);
  return res;
}
