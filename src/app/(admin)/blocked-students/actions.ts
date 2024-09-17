'use server';
import db from '@/db';
import { eq } from 'drizzle-orm';
import { blockedStudents } from '@/db/schema';
import { revalidatePath } from 'next/cache';

//TODO: ADD AUTHORIZATION CHECKS
export async function unblockStudent(id: number) {
  await db.delete(blockedStudents).where(eq(blockedStudents.id, id));
}

export async function addBlockedStudent(
  data: typeof blockedStudents.$inferInsert,
) {
  await db.insert(blockedStudents).values(data).onConflictDoNothing();
  revalidatePath('/blocked-students');
}
