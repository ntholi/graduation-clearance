'use server';

import db from '@/db';
import { clearanceRequest } from '@/db/schema';

export async function requestClearance(stdNo?: string | null) {
  if (!stdNo) return;
  await db.insert(clearanceRequest).values({
    stdNo,
  });
}
