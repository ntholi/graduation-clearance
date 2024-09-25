'use server';
import db from '@/db';
import { graduationConfirmation } from '@/db/schema';

export default async function saveConfirmation(stdNo: string | null) {
  if (!stdNo) return;
  await db.insert(graduationConfirmation).values({ stdNo });
}
