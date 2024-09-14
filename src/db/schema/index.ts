import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './auth';

export const students = pgTable('students', {
  id: integer('id').notNull().primaryKey(),
  stdNo: integer('std_no').notNull(),
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name'),
  email: text('email').unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const signUps = pgTable('signups', {
  id: serial('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  stdNo: text('std_no').notNull(),
  approved: boolean('approved').default(false),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
