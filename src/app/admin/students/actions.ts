'use server';

import db from '@/db';
import { students } from '@/db/schema';
import { eq, like } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type Student = typeof students.$inferSelect;

const ITEMS_PER_PAGE = 15;

export async function getStudents(page: number = 1, search = '') {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const list = await db
    .select()
    .from(students)
    .where(like(students.stdNo, `%${search}%`))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  return {
    items: list,
    pages: Math.ceil(list.length / ITEMS_PER_PAGE),
  };
}

export async function getStudentByUserId(userId: string | undefined) {
  if (!userId) return null;
  const student = await db
    .select()
    .from(students)
    .where(eq(students.userId, userId))
    .then((data) => data[0]);
  return student;
}

export async function getStudent(id: string) {
  const student = await db
    .select()
    .from(students)
    .where(eq(students.stdNo, id))
    .then((data) => data[0]);
  return student;
}

export async function deleteStudent(id: string) {
  await db.delete(students).where(eq(students.stdNo, id));
  revalidatePath('/admin/students');
}

export async function updateStudent(
  id: string,
  values: Student,
): Promise<Student> {
  const res = await db
    .update(students)
    .set(values)
    .where(eq(students.stdNo, id))
    .returning();
  revalidatePath(`/admin/students/${id}`);
  return res[0];
}
