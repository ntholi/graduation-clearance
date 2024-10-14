'use server';

import db from '@/db';
import { graduationConfirmation, students } from '@/db/schema';
import { count, desc, eq, like } from 'drizzle-orm';

const ITEMS_PER_PAGE = 10;

export async function getGraduatingStudents(page: number = 1, search = '') {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const list = await db
    .select()
    .from(graduationConfirmation)
    .where(like(graduationConfirmation.stdNo, `%${search}%`))
    .leftJoin(students, eq(students.stdNo, graduationConfirmation.stdNo))
    .orderBy(desc(graduationConfirmation.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  const totalCount = await db
    .select({ count: count() })
    .from(graduationConfirmation)
    .then((it) => it[0].count);

  return {
    items: list.map((it) => ({
      ...it.graduation_confirmations,
      student: it.students,
    })),
    pages: Math.ceil(totalCount / ITEMS_PER_PAGE),
  };
}

export async function getGraduationConfirmation(stdNo?: string) {
  if (!stdNo) return null;
  return await db.query.graduationConfirmation.findFirst({
    where: eq(graduationConfirmation.stdNo, stdNo),
  });
}

export async function getStudent(stdNo: string) {
  const res = await db
    .select()
    .from(graduationConfirmation)
    .where(eq(graduationConfirmation.stdNo, stdNo))
    .leftJoin(students, eq(students.stdNo, stdNo))
    .then((res) => res[0]);

  return {
    ...res.graduation_confirmations,
    ...res?.students,
    dateCleared: res?.graduation_confirmations?.createdAt,
  };
}
