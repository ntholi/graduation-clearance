import { relations } from 'drizzle-orm';
import {
  boolean,
  char,
  decimal,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { users } from './auth';

export const students = pgTable('students', {
  stdNo: varchar('std_no', { length: 9 }).notNull().primaryKey(),
  userId: text('user_id')
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name'),
  nationalId: text('national_id'),
  phoneNumber: text('phone_number'),
  program: text('program'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const signupRequests = pgTable('signup_requests', {
  id: serial('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  stdNo: varchar('std_no', { length: 9 }).notNull(),
  approved: boolean('approved').default(false),

  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const enrollments = pgTable('enrollments', {
  id: serial('id').notNull().primaryKey(),
  stdNo: varchar('std_no', { length: 9 })
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
  id: varchar('id', { length: 21 })
    .$defaultFn(() => nanoid())
    .primaryKey(),
  stdNo: varchar('std_no', { length: 9 })
    .notNull()
    .references(() => students.stdNo, { onDelete: 'no action' }),

  blockedBy: blockedByEnum('blocked_by').notNull(),
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const financeClearanceStatusEnum = pgEnum('finance_clearance_status', [
  'pending',
  'cleared',
  'blocked',
]);

export const financeClearance = pgTable('finance_clearance', {
  id: serial('id').notNull().primaryKey(),
  stdNo: varchar('std_no', { length: 9 })
    .notNull()
    .references(() => students.stdNo, { onDelete: 'cascade' }),

  status: financeClearanceStatusEnum('status').notNull().default('pending'),
  blockedStudentId: varchar('blocked_student_id', { length: 21 }).references(
    () => blockedStudents.id,
    { onDelete: 'set null' },
  ),
  createdAt: timestamp('created_at').defaultNow(),
});

export const graduatingStudents = pgTable('graduating_students', {
  stdNo: varchar('std_no', { length: 9 })
    .primaryKey()
    .notNull()
    .references(() => students.stdNo, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
});
