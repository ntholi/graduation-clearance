'use server';

import { graduatingStudents, students } from '@/db/schema';
import { eq } from 'drizzle-orm';
import db from '@/db';
import { auth } from '@/auth';

export async function checkClearance(stepId: number): Promise<boolean> {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error('Unauthorized');
  }
  const student = await db
    .select()
    .from(students)
    .where(eq(students.userId, session?.user.id))
    .then((it) => it[0]);

  switch (stepId) {
    case 1:
      const result = await db
        .select()
        .from(graduatingStudents)
        .where(eq(graduatingStudents.stdNo, student.stdNo));
      return result.length > 0;

    default:
      throw new Error('Invalid step ID');
  }
}
