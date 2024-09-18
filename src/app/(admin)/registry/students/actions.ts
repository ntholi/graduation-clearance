'use server';

import db from '@/db';
import { students } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

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

export async function getStudent(id: number) {
  const student = await db
    .select()
    .from(students)
    .where(eq(students.stdNo, id))
    .then((data) => data[0]);
  return student;
}

export async function deleteStudent(id: number) {
  await db.delete(students).where(eq(students.stdNo, id));
  revalidatePath('/registry/students');
}

export async function updateStudent(id: number, values: Student) {
  await db.update(students).set(values).where(eq(students.stdNo, id));
  revalidatePath(`/registry/students/${id}`);
  return id;
}
