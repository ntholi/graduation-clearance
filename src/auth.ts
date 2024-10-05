import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import db from '@/db';
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from './db/schema/auth';
import { getStudentByUserId } from './app/admin/students/actions';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as any,
  callbacks: {
    async session({ session, user }) {
      const student = await getStudentByUserId(user.id);
      if (student) {
        session.user.student = {
          stdNo: student.stdNo,
          name: student.name,
          program: student.program,
        };
      }
      session.user.role = user.role;
      return session;
    },
  },
});
