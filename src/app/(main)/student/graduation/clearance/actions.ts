'use server';

import {
  blockedByEnum,
  blockedStudents,
  financeClearance,
  graduatingStudents,
  students,
} from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import db from '@/db';
import { auth } from '@/auth';
import ClearanceStatus from './ClearanceStatus';

export async function getClearanceQuery(
  step: number,
): Promise<ClearanceStatus> {
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
      return isFinanceCleared(student.stdNo);
    default:
      throw new Error('Unknown step');
  }
}

async function isGraduatingStudent(stdNo: string): Promise<ClearanceStatus> {
  const res = await db
    .select()
    .from(graduatingStudents)
    .where(eq(graduatingStudents.stdNo, stdNo));
  if (res.length) {
    return { status: 'cleared' };
  }
  return { status: 'not cleared', message: 'Consult your faculty' };
}

async function isFinanceCleared(stdNo: string): Promise<ClearanceStatus> {
  const res = await db
    .select()
    .from(financeClearance)
    .where(eq(financeClearance.stdNo, stdNo))
    .limit(1)
    .then((it) => it[0]);
  if (res.status === 'pending') {
    return {
      status: 'pending',
    };
  }
  return isBlocked(stdNo, 'finance');
}

type BlockedBy = (typeof blockedByEnum.enumValues)[number];
async function isBlocked(
  stdNo: string,
  blockedBy: BlockedBy,
): Promise<ClearanceStatus> {
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
  if (res) {
    return {
      status: 'not cleared',
      message: res.reason,
    };
  }
  return {
    status: 'cleared',
  };
}
