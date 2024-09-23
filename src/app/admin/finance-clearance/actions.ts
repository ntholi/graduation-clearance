'use server';

import db from '@/db';
import { financeClearance, students } from '@/db/schema';
import { eq, desc, count, like } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

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
  const student = await db
    .select()
    .from(financeClearance)
    .where(eq(financeClearance.stdNo, stdNo))
    .then((data) => data[0]);
  return student;
}

export async function deleteClearance(stdNo: string) {
  await db.delete(financeClearance).where(eq(financeClearance.stdNo, stdNo));
  revalidatePath('/admin/finance/clearance');
}

export async function updateClearance(
  id: string,
  values: Clearance,
): Promise<Clearance> {
  const res = await db
    .update(financeClearance)
    .set(values)
    .where(eq(financeClearance.stdNo, id))
    .returning();
  revalidatePath(`/admin/finance/clearance/${id}`);
  return res[0];
}
