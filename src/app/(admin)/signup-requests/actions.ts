'use server';

import db from '@/db';
import { signupRequests } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function approveSignUp(id: number) {
  await db
    .update(signupRequests)
    .set({ approved: true })
    .where(eq(signupRequests.id, id));
}
