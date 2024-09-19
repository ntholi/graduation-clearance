'use server';

import db from '@/db';
import { financeClearance } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type Clearance = typeof financeClearance.$inferSelect;

export async function getClearance(stdNo: number) {
  const student = await db
    .select()
    .from(financeClearance)
    .where(eq(financeClearance.stdNo, stdNo))
    .then((data) => data[0]);
  return student;
}

export async function deleteClearance(stdNo: number) {
  await db.delete(financeClearance).where(eq(financeClearance.stdNo, stdNo));
  revalidatePath('/admin/finance/clearance');
}

export async function updateClearance(
  id: number,
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
