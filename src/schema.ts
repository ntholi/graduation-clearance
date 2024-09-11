import { serial, text, timestamp, pgTable } from 'drizzle-orm/pg-core';

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  std_no: text('std_no'),
  name: text('name'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});
