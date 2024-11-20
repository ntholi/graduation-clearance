'use server';

import { auth } from '@/auth';
import db from '@/db';
import { enrollments, grades, students } from '@/db/schema';
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

export async function getTranscript(stdNo: string) {
  const student = await db
    .select()
    .from(students)
    .where(eq(students.stdNo, stdNo))
    .limit(1);

  if (!student.length) return null;

  const enrollmentData = await db
    .select()
    .from(enrollments)
    .where(eq(enrollments.stdNo, stdNo))
    .leftJoin(grades, eq(grades.enrollmentId, enrollments.id));

  const terms = enrollmentData.reduce((acc: any, curr) => {
    const term = curr.enrollments;
    const grade = curr.grades;

    if (!acc[term.term]) {
      acc[term.term] = {
        ...term,
        grades: [],
      };
    }

    if (grade) {
      acc[term.term].grades.push(grade);
    }

    return acc;
  }, {});

  return {
    student: student[0],
    terms: Object.values(terms),
  };
}