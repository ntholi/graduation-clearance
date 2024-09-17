import React from 'react';
import { getStudentByUserId } from '@/app/(admin)/students/student-service';
import { auth } from '@/auth';
import Container from '@/components/ui/container';
import db from '@/db';
import { enrollments } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

async function getTranscriptData(stdNo: number) {
  const data = await db.query.enrollments.findMany({
    with: {
      grades: true,
    },
    where: eq(enrollments.stdNo, stdNo),
    orderBy: (enrollments, { asc }) => [asc(enrollments.term)],
  });

  return data;
}

export default async function TranscriptPage() {
  const session = await auth();
  const student = await getStudentByUserId(session?.user?.id);

  if (!student) {
    return (
      <Container width='md'>
        <h1 className='mb-4 text-2xl font-bold'>Transcript not available</h1>
        <p>Unable to find student information.</p>
      </Container>
    );
  }

  const data = await getTranscriptData(student.stdNo);

  return (
    <Container className='mx-auto mt-10' width='md'>
      <Card className='mb-4'>
        <CardHeader>
          <CardTitle>Transcript</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Student Number:</strong> {student.stdNo}
          </p>
          <p>
            <strong>Program:</strong> {student.program}
          </p>
        </CardContent>
      </Card>

      {data.map((enrollment) => (
        <Card key={enrollment.id} className='mb-4'>
          <CardHeader>
            <CardTitle className='text-base font-normal'>
              <table>
                <tr>
                  <td className='min-w-28 font-bold'>Term:</td>
                  <td>{enrollment.term}</td>
                </tr>
                <tr>
                  <td className='min-w-28 font-bold'>Semester:</td>
                  <td>{enrollment.semester}</td>
                </tr>
              </table>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead className='min-w-64'>Course Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Credits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrollment.grades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell>{grade.courseCode}</TableCell>
                    <TableCell>{grade.courseName}</TableCell>
                    <TableCell>{grade.grade}</TableCell>
                    <TableCell>{grade.credits}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className='mt-4 flex justify-between'>
              <div>
                <p>
                  <strong>GPA:</strong> {enrollment.gpa} / <strong>GPA:</strong>{' '}
                  {enrollment.cgpa}
                </p>
              </div>
              <p>
                <strong>
                  <span className='hidden md:inline'>Earned</span> Credits:
                </strong>{' '}
                {enrollment.credits}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
