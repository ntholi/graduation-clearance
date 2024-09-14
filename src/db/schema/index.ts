import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
} from 'drizzle-orm/pg-core';
import { users } from './auth';

export const students = pgTable('students', {
  id: integer('id').notNull(),
  studentNo: integer('studentNo').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'set null' }),
  name: text('name'),
  email: text('email').unique(),
  createdAt: timestamp('createdAt').defaultNow(),
});
