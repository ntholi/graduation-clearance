import db from '@/db';
import { graduationConfirmation } from '@/db/schema';
import { eq } from 'drizzle-orm';

export function getGraduationConfirmation(stdNo?: string) {
  if (!stdNo) return null;
  return db.query.graduationConfirmation.findFirst({
    where: eq(graduationConfirmation.stdNo, stdNo),
  });
}
