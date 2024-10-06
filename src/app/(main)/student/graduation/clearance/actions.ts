'use server';

import {
  blockedStudents,
  clearanceRequest,
  clearanceResponse,
  graduatingStudents,
  departmentEnum,
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
      return isCleared(student.stdNo, 'library');
    case 3:
      return isBlocked(student.stdNo, 'resource');
    case 4:
      return isCleared(student.stdNo, 'finance');
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
type Responder = (typeof departmentEnum.enumValues)[number];

async function isCleared(
  stdNo: string,
  responder: Responder,
): Promise<ClearanceStatus> {
  const checkBlocked = await isBlocked(stdNo, responder);
  if (checkBlocked.status === 'not cleared') {
    return checkBlocked;
  }
  const request = await db.query.clearanceRequest.findFirst({
    where: and(eq(clearanceRequest.stdNo, stdNo)),
  });
  if (!request) {
    return { status: 'not cleared', message: 'Request not found' };
  }
  const res = await db
    .select()
    .from(clearanceResponse)
    .leftJoin(
      blockedStudents,
      eq(blockedStudents.id, clearanceResponse.blockedStudentId),
    )
    .where(
      and(
        eq(clearanceResponse.clearanceRequestId, request.id),
        eq(clearanceResponse.responder, responder),
      ),
    );
  if (!res.length) {
    return {
      status: 'pending',
    };
  }
  const blocked = res[0].blocked_students;
  if (blocked && blocked.status === 'blocked') {
    return {
      status: 'not cleared',
      message: blocked.reason,
    };
  }
  return {
    status: 'cleared',
  };
}

async function isBlocked(
  stdNo: string,
  department: Responder,
): Promise<ClearanceStatus> {
  const res = await db
    .select()
    .from(blockedStudents)
    .where(
      and(
        eq(blockedStudents.stdNo, stdNo),
        eq(blockedStudents.department, department),
      ),
    )
    .limit(1)
    .then((it) => it[0]);
  if (res && res.status === 'blocked') {
    return {
      status: 'not cleared',
      message: res.reason,
    };
  }
  return {
    status: 'cleared',
  };
}

export async function getClearanceRequest(stdNo?: string) {
  if (!stdNo) return null;
  const request = await db.query.clearanceRequest.findFirst({
    where: and(eq(clearanceRequest.stdNo, stdNo)),
  });
  return request;
}
