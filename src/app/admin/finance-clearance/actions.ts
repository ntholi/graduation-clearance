'use server';

import db from '@/db';
import { blockedStudents, financeClearance, students } from '@/db/schema';
import { eq, desc, count, like, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { FinanceClearanceSchema } from './Form';
import { z } from 'zod';

export type Clearance = typeof financeClearance.$inferSelect;

const ITEMS_PER_PAGE = 15;

export async function getClearanceList(page: number = 1, search = '') {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const list = await db
    .select({
      id: financeClearance.id,
      stdNo: financeClearance.stdNo,
      student: {
        name: students.name,
      },
    })
    .from(financeClearance)
    .where(like(students.name, `%${search}%`))
    .leftJoin(students, eq(students.stdNo, financeClearance.stdNo))
    .orderBy(desc(financeClearance.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  const totalCount = await db
    .select({ count: count() })
    .from(financeClearance)
    .then((it) => it[0].count);

  return {
    items: list.map((it) => ({
      ...it,
    })),
    pages: Math.ceil(totalCount / ITEMS_PER_PAGE),
  };
}

export async function getClearance(stdNo: string) {
  const res = await db
    .select({
      id: financeClearance.id,
      stdNo: financeClearance.stdNo,
      student: {
        name: students.name,
      },
      blockedStudent: {
        reason: blockedStudents.reason,
      },
      status: financeClearance.status,
      createdAt: financeClearance.createdAt,
    })
    .from(financeClearance)
    .where(eq(financeClearance.stdNo, stdNo))
    .leftJoin(students, eq(students.stdNo, financeClearance.stdNo))
    .leftJoin(
      blockedStudents,
      and(
        eq(students.stdNo, blockedStudents.stdNo),
        eq(blockedStudents.blockedBy, 'finance'),
      ),
    )
    .then((it) => it[0]);

  return res;
}

export async function deleteClearance(stdNo: string) {
  await db.delete(financeClearance).where(eq(financeClearance.stdNo, stdNo));
  revalidatePath('/admin/finance-clearance');
}

export async function blockStudent(
  stdNo: string,
  reason?: string,
): Promise<void> {
  const blocked = await db
    .insert(blockedStudents)
    .values({
      blockedBy: 'finance',
      stdNo,
      reason: reason,
    })
    .returning()
    .then((it) => it[0]);

  await db
    .update(financeClearance)
    .set({
      status: 'blocked',
      blockedStudentId: blocked.id,
    })
    .where(eq(financeClearance.stdNo, stdNo))
    .returning();
  revalidatePath(`/admin/finance-clearance/${stdNo}`);
}
