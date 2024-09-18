'use server';

import db from '@/db';
import { blockedStudents } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

type Student = typeof blockedStudents.$inferInsert;

export async function createBlockedStudent(values: Student) {
  const res = await db
    .insert(blockedStudents)
    .values({
      ...values,
      blockedBy: 'finance',
    })
    .returning();
  revalidatePath('/admin/finance/blocked-students/finance');
  return res[0];
}
