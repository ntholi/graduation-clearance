import { userRole } from '@/db/schema/auth';
import { User as DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    role: (typeof userRole.enumValues)[number];
    student?: {
      stdNo: string;
      name: string | null;
      program: string | null;
    };
  }
}
