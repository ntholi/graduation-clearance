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

export async function getClearanceQuery(step: number): Promise<string | null> {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error('Unauthorized');
  }

  const student = await db
    .select()
    .from(students)
    .where(eq(students.userId, session.user.id))
    .then((it) => it[0]);

  switch (step) {
    case 1:
      return isGraduatingStudent(student.stdNo);
    case 2:
      return isBlocked(student.stdNo, 'library');
    case 3:
      return isBlocked(student.stdNo, 'resource');
    case 4:
      return isBlocked(student.stdNo, 'finance');
    default:
      return 'Unknown';
  }
}

async function isGraduatingStudent(stdNo: string) {
  const res = await db
    .select()
    .from(graduatingStudents)
    .where(eq(graduatingStudents.stdNo, stdNo));
  return res.length ? null : 'Consult your faculty';
}

type BlockedBy = (typeof blockedByEnum.enumValues)[number];

async function isBlocked(stdNo: string, blockedBy: BlockedBy) {
  const res = await db
    .select()
    .from(blockedStudents)
    .where(
      and(
        eq(blockedStudents.stdNo, stdNo),
        eq(blockedStudents.blockedBy, blockedBy),
      ),
    )
    .limit(1)
    .then((it) => it[0]);
  return res ? res.reason : null;
}
