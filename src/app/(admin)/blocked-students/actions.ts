import db from '@/db';
import { blockedStudents } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function unblockStudent(id: number) {
  await db.delete(blockedStudents).where(eq(blockedStudents.id, id));
}
