'use server';

import { auth } from '@/auth';
import db from '@/db';
import { blockedStudents, students } from '@/db/schema';
import { users } from '@/db/schema/auth';
import { count, desc, eq, and } from 'drizzle-orm';

const ITEMS_PER_PAGE = 10;

export async function getBlockedStudents(page: number = 1) {
  const department =
    (await auth())?.user?.role === 'library' ? 'library' : 'finance';
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const list = await db
    .select({
      stdNo: blockedStudents.stdNo,
      names: students.name,
      program: students.program,
      reason: blockedStudents.reason,
      dateBlocked: blockedStudents.createdAt,
      blockedBy: users.name,
    })
    .from(blockedStudents)
    .where(
      and(
        eq(blockedStudents.department, department),
        eq(blockedStudents.status, 'blocked'),
      ),
    )
    .leftJoin(students, eq(students.stdNo, blockedStudents.stdNo))
    .leftJoin(users, eq(users.id, blockedStudents.createdBy))
    .orderBy(desc(blockedStudents.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  const totalCount = await db
    .select({ count: count() })
    .from(blockedStudents)
    .where(
      and(
        eq(blockedStudents.department, department),
        eq(blockedStudents.status, 'blocked'),
      ),
    )
    .then((it) => it[0].count);

  return {
    items: list,
    pages: Math.ceil(totalCount / ITEMS_PER_PAGE),
  };
}

export async function countBlockedStudents() {
  const department =
    (await auth())?.user?.role === 'library' ? 'library' : 'finance';
  const blocked = await db
    .select({ count: count() })
    .from(blockedStudents)
    .where(
      and(
        eq(blockedStudents.department, department),
        eq(blockedStudents.status, 'blocked'),
      ),
    );

  return blocked[0].count;
}