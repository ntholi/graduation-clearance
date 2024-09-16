import db from '@/db';
import { signUps } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function approveSignUp(id: number) {
  await db.update(signUps).set({ approved: true }).where(eq(signUps.id, id));
}
