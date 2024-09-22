'use server';

import {
  blockedByEnum,
  blockedStudents,
  graduatingStudents,
  students,
} from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import db from '@/db';
import { auth } from '@/auth';

export async function checkClearance(stepId: number): Promise<boolean> {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error('Unauthorized');
  }
  const student = await db
    .select()
    .from(students)
    .where(eq(students.userId, session?.user.id))
    .then((it) => it[0]);

  switch (stepId) {
    case 1:
      return isGraduatingStudent(student.stdNo);
    case 2:
      isBlocked(student.stdNo, 'library');
    case 3:
      isBlocked(student.stdNo, 'resource');

    default:
      throw new Error('Invalid step ID');
  }
}

async function isGraduatingStudent(stdNo: string) {
  const res = await db
    .select()
    .from(graduatingStudents)
    .where(eq(graduatingStudents.stdNo, stdNo));
  return res.length > 0;
}

async function isBlocked(
  stdNo: string,
  blockedBy: (typeof blockedByEnum.enumValues)[number],
) {
  const res = await db
    .select()
    .from(blockedStudents)
    .where(
      and(
        eq(blockedStudents.stdNo, stdNo),
        eq(blockedStudents.blockedBy, blockedBy),
      ),
    );
  return res.length === 0;
}
