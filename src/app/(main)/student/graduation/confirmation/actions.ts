'use server';
import db from '@/db';
import { graduationConfirmation } from '@/db/schema';

type Confirmation = typeof graduationConfirmation.$inferInsert;

export default async function saveConfirmation(obj: Confirmation) {
  await db
    .insert(graduationConfirmation)
    .values(obj)
    .onConflictDoUpdate({
      target: [graduationConfirmation.stdNo],
      set: obj,
    });
}
