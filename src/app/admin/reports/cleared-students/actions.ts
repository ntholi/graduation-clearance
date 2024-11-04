'use server';

import { auth } from '@/auth';
import db from '@/db';
import {
  blockedStudents,
  clearanceRequest,
  clearanceResponse,
  students,
  financePayments,
} from '@/db/schema';
import { users } from '@/db/schema/auth';
import { count, desc, eq, and, isNull, or, like, sql } from 'drizzle-orm';

const ITEMS_PER_PAGE = 10;

export async function getClearedStudents(page: number = 1, search?: string) {
  const clearedBy =
    (await auth())?.user?.role === 'library' ? 'library' : 'finance';
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const searchCondition = search
    ? or(
        like(students.name, `%${search}%`),
        like(students.stdNo, `%${search}%`),
        like(students.program, `%${search}%`),
      )
    : undefined;

  const list = await db
    .select({
      stdNo: clearanceRequest.stdNo,
      names: students.name,
      program: students.program,
      dateRequested: clearanceRequest.createdAt,
      dateCleared: clearanceResponse.createdAt,
      clearedBy: users.name,
      payments: sql<{ receipt_no: string; item: string; amount: string }[]>`
        json_agg(
          json_build_object(
            'receipt_no', ${financePayments.receiptNo},
            'item', ${financePayments.item},
            'amount', ${financePayments.amount}::text
          )
        ) FILTER (WHERE ${financePayments.receiptNo} IS NOT NULL)
      `,
    })
    .from(clearanceResponse)
    .where(
      and(
        eq(clearanceResponse.responder, clearedBy),
        or(isNull(blockedStudents.id), eq(blockedStudents.status, 'unblocked')),
        searchCondition,
      ),
    )
    .leftJoin(
      clearanceRequest,
      eq(clearanceRequest.id, clearanceResponse.clearanceRequestId),
    )
    .leftJoin(students, eq(students.stdNo, clearanceRequest.stdNo))
    .leftJoin(users, eq(users.id, clearanceResponse.createdBy))
    .leftJoin(
      blockedStudents,
      and(
        eq(blockedStudents.stdNo, clearanceRequest.stdNo),
        eq(blockedStudents.department, clearedBy),
      ),
    )
    .leftJoin(
      financePayments,
      eq(financePayments.stdNo, clearanceRequest.stdNo),
    )
    .groupBy(
      clearanceRequest.stdNo,
      students.name,
      students.program,
      clearanceRequest.createdAt,
      clearanceResponse.createdAt,
      users.name,
    )
    .orderBy(desc(clearanceResponse.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  const totalCount = await db
    .select({ count: count() })
    .from(clearanceResponse)
    .leftJoin(
      clearanceRequest,
      eq(clearanceRequest.id, clearanceResponse.clearanceRequestId),
    )
    .leftJoin(students, eq(students.stdNo, clearanceRequest.stdNo))
    .leftJoin(
      blockedStudents,
      and(
        eq(blockedStudents.stdNo, clearanceRequest.stdNo),
        eq(blockedStudents.department, clearedBy),
      ),
    )
    .where(
      and(
        eq(clearanceResponse.responder, clearedBy),
        or(isNull(blockedStudents.id), eq(blockedStudents.status, 'unblocked')),
        searchCondition,
      ),
    )
    .then((it) => it[0].count);

  return {
    items: list.map((item) => ({
      ...item,
      payments: item.payments || [],
    })),
    pages: Math.ceil(totalCount / ITEMS_PER_PAGE),
  };
}

export async function getAllClearedStudents() {
  const clearedBy =
    (await auth())?.user?.role === 'library' ? 'library' : 'finance';

  const list = await db
    .select({
      stdNo: clearanceRequest.stdNo,
      names: students.name,
      program: students.program,
      dateRequested: clearanceRequest.createdAt,
      dateCleared: clearanceResponse.createdAt,
      clearedBy: users.name,
      payments: sql<{ receipt_no: string; item: string; amount: string }[]>`
        json_agg(
          json_build_object(
            'receipt_no', ${financePayments.receiptNo},
            'item', ${financePayments.item},
            'amount', ${financePayments.amount}::text
          )
        ) FILTER (WHERE ${financePayments.receiptNo} IS NOT NULL)
      `,
    })
    .from(clearanceResponse)
    .where(
      and(
        eq(clearanceResponse.responder, clearedBy),
        or(isNull(blockedStudents.id), eq(blockedStudents.status, 'unblocked')),
      ),
    )
    .leftJoin(
      clearanceRequest,
      eq(clearanceRequest.id, clearanceResponse.clearanceRequestId),
    )
    .leftJoin(students, eq(students.stdNo, clearanceRequest.stdNo))
    .leftJoin(users, eq(users.id, clearanceResponse.createdBy))
    .leftJoin(
      blockedStudents,
      and(
        eq(blockedStudents.stdNo, clearanceRequest.stdNo),
        eq(blockedStudents.department, clearedBy),
      ),
    )
    .leftJoin(
      financePayments,
      eq(financePayments.stdNo, clearanceRequest.stdNo),
    )
    .groupBy(
      clearanceRequest.stdNo,
      students.name,
      students.program,
      clearanceRequest.createdAt,
      clearanceResponse.createdAt,
      users.name,
    )
    .orderBy(desc(clearanceResponse.createdAt));

  return list.map((item) => ({
    ...item,
    payments: item.payments || [],
  }));
}

export async function countClearedStudents() {
  const clearedBy =
    (await auth())?.user?.role === 'library' ? 'library' : 'finance';
  const _count = await db
    .select({ count: count() })
    .from(clearanceResponse)
    .where(eq(clearanceResponse.responder, clearedBy));

  const blocked = await db
    .select({ count: count() })
    .from(blockedStudents)
    .where(
      and(
        eq(blockedStudents.department, clearedBy),
        eq(blockedStudents.status, 'blocked'),
      ),
    );

  return _count[0].count - blocked[0].count;
}

export async function getClearanceResponse(stdNo?: string) {
  if (!stdNo) return null;
  const clearedBy =
    (await auth())?.user?.role === 'library' ? 'library' : 'finance';
  const list = await db
    .select()
    .from(clearanceResponse)
    .where(eq(clearanceResponse.responder, clearedBy))
    .leftJoin(
      clearanceRequest,
      eq(clearanceRequest.id, clearanceResponse.clearanceRequestId),
    )
    .leftJoin(students, eq(students.stdNo, clearanceRequest.stdNo))
    .leftJoin(users, eq(users.id, clearanceResponse.createdBy))
    .orderBy(desc(clearanceResponse.createdAt))
    .limit(1);

  return list[0];
}
