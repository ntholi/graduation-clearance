'use server';
import { auth } from '@/auth';
import db from '@/db';
import { signUps } from '@/db/schema';
import { signUpSchema } from './schema';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

export async function signUpStudent(student: z.infer<typeof signUpSchema>) {
  const session = await auth();
  if (!session?.user) {
    return { error: 'Unauthorized' };
  }
  await db
    .insert(signUps)
    .values({
      name: student.name,
      stdNo: student.studentNumber,
      userId: session.user.id!,
    })
    .onConflictDoUpdate({
      target: signUps.userId,
      set: { name: student.name, stdNo: student.studentNumber },
    });
}

export async function getSignUp() {
  const session = await auth();
  if (!session?.user) {
    return { error: 'Unauthorized' };
  }
  const signUp = await db.query.signUps.findFirst({
    where: eq(signUps.userId, session.user.id!),
  });
  return signUp;
}
