'use server';
import { auth } from '@/auth';
import db from '@/db';
import { signupRequests } from '@/db/schema';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema/auth';
import { SignUpSchema } from './form';

export async function signUpStudent(student: z.infer<typeof SignUpSchema>) {
  const session = await auth();
  if (!session?.user) {
    return { error: 'Unauthorized' };
  }
  await db
    .insert(signupRequests)
    .values({
      name: student.name,
      stdNo: student.studentNumber,
      userId: session.user.id!,
    })
    .onConflictDoUpdate({
      target: signupRequests.userId,
      set: { name: student.name, stdNo: student.studentNumber },
    });
  await db
    .update(users)
    .set({ phoneNumber: student.phoneNumber })
    .where(eq(users.id, session.user.id!));
}

export async function getSignUp() {
  const session = await auth();
  if (!session?.user) {
    return { error: 'Unauthorized' };
  }
  const signUp = await db
    .select()
    .from(signupRequests)
    .where(eq(signupRequests.userId, session.user.id!))
    .innerJoin(users, eq(users.id, signupRequests.userId))
    .then((it) => it[0]);
  return {
    name: signUp?.signup_requests.name,
    studentNumber: signUp?.signup_requests.stdNo,
    phoneNumber: signUp?.users.phoneNumber,
  };
}
