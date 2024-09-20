'use server';

import db from '@/db';
import { graduatingStudents, students } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type Clearance = typeof graduatingStudents.$inferSelect;

export async function getStudent(stdNo: number) {
  const student = await db
    .select()
    .from(graduatingStudents)
    .where(eq(graduatingStudents.stdNo, stdNo))
    .then((data) => data[0]);
  return student;
}

export async function createGraduatingStudent(
  values: Clearance,
): Promise<Clearance> {
  let student = await db
    .select()
    .from(students)
    .where(eq(students.stdNo, values.stdNo))
    .then((it) => it[0]);
  if (!student) {
    student = await db
      .insert(students)
      .values({
        stdNo: values.stdNo,
      })
      .onConflictDoNothing()
      .returning()
      .then((it) => it[0]);
  }
  const res = await db
    .insert(graduatingStudents)
    .values(values)
    .returning()
    .then((data) => data[0]);
  revalidatePath('/admin/graduating-students');
  return res;
}

export async function deleteStudent(stdNo: number) {
  await db
    .delete(graduatingStudents)
    .where(eq(graduatingStudents.stdNo, stdNo));
  revalidatePath('/admin/graduating-students');
}

export async function updateStudent(
  id: number,
  values: Clearance,
): Promise<Clearance> {
  const res = await db
    .update(graduatingStudents)
    .set(values)
    .where(eq(graduatingStudents.stdNo, id))
    .returning();
  revalidatePath(`/admin/graduating-students/${id}`);
  return res[0];
}
