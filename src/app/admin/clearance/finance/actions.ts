'use server';

import db from '@/db';
import { financeClearance, students } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type Clearance = typeof financeClearance.$inferSelect;

export async function getClearanceList() {
  const list = await db
    .select()
    .from(financeClearance)
    .leftJoin(students, eq(students.stdNo, financeClearance.stdNo))
    .orderBy(desc(financeClearance.createdAt));
  return list.map((it) => ({
    ...it.finance_clearance,
    student: it.students,
  }));
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
