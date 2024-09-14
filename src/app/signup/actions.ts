'use server';
import { auth } from '@/auth';
import db from '@/db';
import { signUps } from '@/db/schema';
import { signUpSchema } from './schema';
import { z } from 'zod';

export async function signUpStudent(student: z.infer<typeof signUpSchema>) {
  const session = await auth();
  if (!session?.user) {
    return { error: 'Unauthorized' };
  }
  await db
    .insert(signUps)
    .values({
      name: student.name,
      studentNumber: student.studentNumber,
      userId: session.user.id!,
    })
    .onConflictDoUpdate({
      target: signUps.userId,
      set: { name: student.name, studentNumber: student.studentNumber },
    });
}
