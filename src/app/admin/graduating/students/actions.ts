'use server';

import db from '@/db';
import { graduatingStudents, students } from '@/db/schema';
import { eq, desc, count, like } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type Clearance = typeof graduatingStudents.$inferSelect;

const ITEMS_PER_PAGE = 15;

export async function getGraduatingStudents(page: number = 1, search = '') {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const list = await db
    .select()
    .from(graduatingStudents)
    .where(like(graduatingStudents.stdNo, `%${search}%`))
    .leftJoin(students, eq(students.stdNo, graduatingStudents.stdNo))
    .orderBy(desc(graduatingStudents.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  const totalCount = await db
    .select({ count: count() })
    .from(graduatingStudents)
    .then((it) => it[0].count);

  return {
    items: list.map((it) => ({
      ...it.graduating_students,
      student: it.students,
    })),
    pages: Math.ceil(totalCount / ITEMS_PER_PAGE),
  };
}

export async function getStudent(stdNo: string) {
  const student = await db
    .select()
    .from(graduatingStudents)
    .where(eq(graduatingStudents.stdNo, stdNo))
    .then((data) => data[0]);
  return student;
}

export async function saveGraduationList(stdNumbers: string[]) {
  await db
    .insert(graduatingStudents)
    .values(
      stdNumbers.map((stdNo) => ({
        stdNo,
      })),
    )
    .onConflictDoNothing();
  revalidatePath('/admin/graduating/students');
}

export async function createGraduatingStudent(
  values: Clearance,
): Promise<Clearance> {
  const res = await db
    .insert(graduatingStudents)
    .values(values)
    .returning()
    .then((data) => data[0]);
  revalidatePath('/admin/graduating/students');
  return res;
}

export async function deleteStudent(stdNo: string) {
  await db
    .delete(graduatingStudents)
    .where(eq(graduatingStudents.stdNo, stdNo));
  revalidatePath('/admin/graduating/students');
}

export async function updateStudent(
  id: string,
  values: Clearance,
): Promise<Clearance> {
  const res = await db
    .update(graduatingStudents)
    .set(values)
    .where(eq(graduatingStudents.stdNo, id))
    .returning();
  revalidatePath(`/admin/graduating/students/${id}`);
  return res[0];
}