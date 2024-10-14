import { relations } from 'drizzle-orm';
import {
  boolean,
  char,
  decimal,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  date,
  varchar,
} from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { users } from './auth';

export const genderEnum = pgEnum('gender', ['Male', 'Female']);

export const students = pgTable('students', {
  stdNo: varchar('std_no', { length: 9 }).notNull().primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  name: text('name'),
  nationalId: text('national_id'),
  program: text('program'),
  gender: genderEnum('gender'),
  nationality: varchar('nationality', { length: 50 }),
  dateOfBirth: date('date_of_birth'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  updatedBy: varchar('updated_by', { length: 21 }).references(() => users.id),
});

export const financePayments = pgTable('finance_payments', {
  id: serial('id').notNull().primaryKey(),
  stdNo: varchar('std_no', { length: 9 }).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  receiptNo: varchar('receipt_no', { length: 10 }).notNull().unique(),
  item: text('item').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const signUpRequestStatus = pgEnum('sign_up_request', [
  'pending',
  'approved',
  'rejected',
]);

export const signupRequests = pgTable('signup_requests', {
  id: serial('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  stdNo: varchar('std_no', { length: 9 }).notNull(),
  status: signUpRequestStatus('status').default('pending').notNull(),
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
  grade: char('grade', { length: 3 }).notNull(),
  credits: integer('credits').notNull(),
});

export const gradeRelations = relations(grades, ({ one }) => ({
  enrollment: one(enrollments, {
    fields: [grades.enrollmentId],
    references: [enrollments.id],
  }),
}));

export const departmentEnum = pgEnum('department', [
  'finance',
  'library',
  'resource',
  'it',
  'admin',
]);

export const blockedStudentStatus = pgEnum('blocked_student_status', [
  'blocked',
  'unblocked',
]);

export const blockedStudents = pgTable('blocked_students', {
  id: varchar('id', { length: 21 })
    .$defaultFn(() => nanoid())
    .primaryKey(),
  stdNo: varchar('std_no', { length: 9 }).notNull(),
  department: departmentEnum('department').notNull(),
  reason: text('reason'),
  status: blockedStudentStatus('status').notNull().default('blocked'),
  createdAt: timestamp('created_at').defaultNow(),
  createdBy: varchar('created_by', { length: 21 })
    .notNull()
    .references(() => users.id),
  unBlockedAt: timestamp('unblocked_at'),
  unBlockedBy: varchar('unblocked_by', { length: 21 }).references(
    () => users.id,
  ),
});

export const clearanceRequest = pgTable('clearance_requests', {
  id: serial('id').notNull().primaryKey(),
  stdNo: varchar('std_no', { length: 9 })
    .notNull()
    .references(() => students.stdNo, { onDelete: 'cascade' }),
  blockedStudentId: varchar('blocked_student_id', { length: 21 }).references(
    () => blockedStudents.id,
    { onDelete: 'set null' },
  ),
  createdAt: timestamp('created_at').defaultNow(),
});

export const clearanceResponse = pgTable(
  'clearance_responses',
  {
    clearanceRequestId: integer('clearance_request_id')
      .notNull()
      .references(() => clearanceRequest.id, { onDelete: 'cascade' }),
    blockedStudentId: varchar('blocked_student_id', { length: 21 }).references(
      () => blockedStudents.id,
      { onDelete: 'set null' },
    ),
    responder: departmentEnum('responder').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    createdBy: varchar('created_by', { length: 21 })
      .notNull()
      .references(() => users.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.clearanceRequestId, table.responder] }),
  }),
);

export const graduatingStudents = pgTable('graduating_students', {
  stdNo: varchar('std_no', { length: 9 }).primaryKey().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  createdBy: varchar('created_by', { length: 21 }).references(() => users.id),
  updatedAt: timestamp('updated_at'),
  updatedBy: varchar('updated_by', { length: 21 }).references(() => users.id),
});

export const graduationConfirmation = pgTable('graduation_confirmations', {
  stdNo: varchar('std_no', { length: 9 })
    .primaryKey()
    .notNull()
    .references(() => students.stdNo, { onDelete: 'cascade' }),
  cleared: boolean('cleared').notNull().default(false),
  confirmed: boolean('confirmed').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
});
