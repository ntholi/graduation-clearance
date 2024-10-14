'use server';

import { auth } from '@/auth';
import db from '@/db';
import { graduatingStudents, students } from '@/db/schema';
import { eq, desc, count, like } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type GraduatingStudent = typeof graduatingStudents.$inferSelect;

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

export async function getGraduatingStudent(stdNo: string) {
  const student = await db.query.graduatingStudents.findFirst({
    where: eq(graduatingStudents.stdNo, stdNo),
  });
  return student;
}

export async function isGraduating(stdNo?: string | null) {
  if (!stdNo) return false;
  const student = await db
    .select()
    .from(graduatingStudents)
    .where(eq(graduatingStudents.stdNo, stdNo))
    .limit(1);
  return student.length > 0;
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
  student: GraduatingStudent,
): Promise<GraduatingStudent> {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error('Unauthorized');
  }
  const res = await db
    .insert(graduatingStudents)
    .values({ ...student, createdBy: session.user.id })
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
  student: GraduatingStudent,
): Promise<GraduatingStudent> {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error('Unauthorized');
  }
  const res = await db
    .update(graduatingStudents)
    .set({ ...student, updatedBy: session.user.id, updatedAt: new Date() })
    .where(eq(graduatingStudents.stdNo, id))
    .returning();
  revalidatePath(`/admin/graduating/students/${id}`);
  return res[0];
}
