'use server';

import { isGraduating } from '@/app/admin/graduating/students/actions';
import db from '@/db';
import { clearanceRequest } from '@/db/schema';

export async function requestClearance(stdNo?: string | null) {
  if (!stdNo) return;
  const graduating = await isGraduating(stdNo);
  if (graduating) {
    await db.insert(clearanceRequest).values({
      stdNo,
    });
  }
}
