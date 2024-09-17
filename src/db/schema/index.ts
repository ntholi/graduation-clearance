import {
  boolean,
  char,
  decimal,
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './auth';
import { relations } from 'drizzle-orm';

export const students = pgTable('students', {
  stdNo: integer('std_no').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name'),
  nationalId: text('national_id').notNull(),
  program: text('program').notNull(),
  email: text('email').unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const signupRequests = pgTable('signup_requests', {
  id: serial('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  stdNo: integer('std_no').notNull(),
  approved: boolean('approved').default(false),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const enrollments = pgTable('enrollments', {
  id: serial('id').notNull().primaryKey(),
  stdNo: integer('std_no')
    .notNull()
    .references(() => students.stdNo, { onDelete: 'cascade' }),
  term: text('term').notNull(),
  semester: text('semester').notNull(),
  gpa: decimal('gpa', { precision: 3, scale: 2 }).notNull(),
  cgpa: decimal('cgpa', { precision: 3, scale: 2 }).notNull(),
  credits: integer('credits').notNull(),
});

export const enrollmentRelations = relations(enrollments, ({ many }) => ({
  grades: many(grades),
}));

export const grades = pgTable('grades', {
  id: serial('id').notNull().primaryKey(),
  enrollmentId: integer('enrollment_id')
    .notNull()
    .references(() => enrollments.id, { onDelete: 'cascade' }),
  courseCode: text('course_code').notNull(),
  courseName: text('course_name').notNull(),
  grade: char('grade', { length: 2 }).notNull(),
  credits: integer('credits').notNull(),
});

export const gradeRelations = relations(grades, ({ one }) => ({
  enrollment: one(enrollments, {
    fields: [grades.enrollmentId],
    references: [enrollments.id],
  }),
}));

export const blockedByEnum = pgEnum('blocked_by', [
  'finance',
  'library',
  'resource',
  'it',
]);

export const blockedStudents = pgTable('blocked_students', {
  id: serial('id').notNull().primaryKey(),
  stdNo: integer('std_no')
    .notNull()
    .references(() => students.stdNo, { onDelete: 'no action' }),
  blockedBy: blockedByEnum('blocked_by').notNull(),
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow(),
});
