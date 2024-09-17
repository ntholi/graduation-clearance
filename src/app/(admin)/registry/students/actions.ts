'use server';

import db from '@/db';
import { students } from '@/db/schema';
import { eq } from 'drizzle-orm';

export type Student = typeof students.$inferSelect;

export async function getStudentByUserId(userId: string | undefined) {
  if (!userId) return null;
  const student = await db
    .select()
    .from(students)
    .where(eq(students.userId, userId))
    .then((data) => data[0]);
  return student;
}
