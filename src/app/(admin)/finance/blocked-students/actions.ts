import db from '@/db';
import { blockedStudents, students } from '@/db/schema';
import { and, desc, eq } from 'drizzle-orm';

type BlockedBy = (typeof blockedStudents.$inferSelect)['blockedBy'];

export async function getBlockedStudents(blockedBy: BlockedBy) {
  return await db
    .select({
      id: blockedStudents.id,
      stdNo: blockedStudents.stdNo,
      student: {
        name: students.name,
      },
    })
    .from(blockedStudents)
    .where(eq(blockedStudents.blockedBy, blockedBy))
    .leftJoin(students, eq(students.stdNo, blockedStudents.stdNo))
    .orderBy(desc(blockedStudents.createdAt));
}

export async function getBlockedStudent(id: number, blockedBy: BlockedBy) {
  const data = await db
    .select()
    .from(blockedStudents)
    .where(
      and(eq(blockedStudents.id, id), eq(blockedStudents.blockedBy, blockedBy)),
    )
    .leftJoin(students, eq(students.stdNo, blockedStudents.stdNo))
    .then((res) => res[0]);
  return {
    ...data.blocked_students,
    student: data?.students || null,
  };
}
