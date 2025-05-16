'use server';

import db from '@/db';
import { enrollments, grades, students } from '@/db/schema';
import { eq, like } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

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
        creditsEarned: 0,
        cumulativeCredits: 0,
      };
    }

    if (grade) {
      acc[term.term].grades.push(grade);
      if (!failingGrade(grade.grade)) {
        acc[term.term].creditsEarned += grade.credits || 0;
      }
    }

    return acc;
  }, {});

  const sortedTerms = Object.values(terms)
    .sort((a: any, b: any) => a.term.localeCompare(b.term))
    .map((term: any) => ({
      ...term,
      term: toWords(term.term),
    }));

  let runningTotal = 0;
  sortedTerms.forEach((term: any) => {
    runningTotal += term.creditsEarned;
    term.cumulativeCredits = runningTotal;
  });

  return {
    student: student[0],
    terms: sortedTerms,
  };
}

export async function updateGrade(
  gradeId: number,
  updates: { courseCode?: string; courseName?: string; credits?: number },
) {
  await db.update(grades).set(updates).where(eq(grades.id, gradeId));

  if (updates.credits !== undefined) {
    const updatedGrade = await db
      .select()
      .from(grades)
      .where(eq(grades.id, gradeId))
      .limit(1);

    if (updatedGrade.length) {
      const enrollmentId = updatedGrade[0].enrollmentId;

      const termGrades = await db
        .select()
        .from(grades)
        .where(eq(grades.enrollmentId, enrollmentId));

      // Calculate new total credits for the term
      const totalCredits = termGrades.reduce((sum, grade) => {
        if (!failingGrade(grade.grade)) {
          return sum + (grade.credits || 0);
        }
        return sum;
      }, 0);

      await db
        .update(enrollments)
        .set({ credits: totalCredits })
        .where(eq(enrollments.id, enrollmentId));
    }
  }

  revalidatePath('/admin/transcripts');
}

export async function deleteGrade(gradeId: number) {
  const grade = await db
    .select()
    .from(grades)
    .where(eq(grades.id, gradeId))
    .limit(1)
    .then((rows) => rows[0]);

  if (!grade) throw new Error('Grade not found');

  const enrollmentId = grade.enrollmentId;

  await db.delete(grades).where(eq(grades.id, gradeId));

  // Get remaining grades for the term
  const termGrades = await db
    .select()
    .from(grades)
    .where(eq(grades.enrollmentId, enrollmentId));

  // Calculate new total credits for the term
  const totalCredits = termGrades.reduce((sum, grade) => {
    if (!failingGrade(grade.grade)) {
      return sum + (grade.credits || 0);
    }
    return sum;
  }, 0);

  // Update enrollment credits
  await db
    .update(enrollments)
    .set({ credits: totalCredits })
    .where(eq(enrollments.id, enrollmentId));

  revalidatePath('/admin/transcripts');
}

export async function updateStudent(stdNo: string, updates: Partial<Student>) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error('Unauthorized');
  }

  await db
    .update(students)
    .set({
      ...updates,
      updatedAt: new Date(),
      updatedBy: session.user.id,
    })
    .where(eq(students.stdNo, stdNo));

  revalidatePath('/admin/transcripts');
  revalidatePath(`/admin/transcripts/${stdNo}`);
}

function failingGrade(grade: string) {
  return ['F', 'PP', 'ANN', 'GNS', 'FIN', 'FX', 'DNC', 'DNA', 'DNS'].includes(
    grade.toUpperCase().trim(),
  );
}

function toWords(string: string) {
  const [year, month] = string.split('-');
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return `${monthNames[parseInt(month) - 1]} ${year}`;
}
