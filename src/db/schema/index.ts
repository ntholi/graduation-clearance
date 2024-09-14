import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
} from 'drizzle-orm/pg-core';
import { users } from './auth';
import { relations } from 'drizzle-orm';

export const students = pgTable('students', {
  id: integer('id').notNull().primaryKey(),
  studentNo: integer('studentNo').notNull(),
  userId: text('userId')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name'),
  email: text('email').unique(),
  createdAt: timestamp('createdAt').defaultNow(),
});
