import { getStudentByUserId } from '@/app/(admin)/students/student-service';
import { auth } from '@/auth';
import Container from '@/components/ui/container';
import React from 'react';
import { enrollments, grades } from '@/db/schema';
import { eq } from 'drizzle-orm';
import db from '@/db';

async function getTranscriptData(stdNo: number) {
  const data = await db.query.enrollments.findMany({
    with: {
      grades: true,
    },
    where: eq(enrollments.stdNo, stdNo),
  });

  return data;
}

export default async function TranscriptPage() {
  const session = await auth();
  const student = await getStudentByUserId(session?.user?.id);

  if (!student) {
    return (
      <Container className='mx-auto mt-10 max-w-4xl'>
        <h1 className='mb-4 text-2xl font-bold'>Transcript not available</h1>
        <p>Unable to find student information.</p>
      </Container>
    );
  }

  const data = await getTranscriptData(student.stdNo);

  return (
    <Container className='mx-auto mt-10 max-w-4xl'>
      <h1 className='mb-4 text-2xl font-bold'>Academic Transcript</h1>
      <div className='mb-4'>
        <p>
          <strong>Student Name:</strong> {student.name}
        </p>
        <p>
          <strong>Student Number:</strong> {student.stdNo}
        </p>
        <p>
          <strong>Program:</strong> {student.program}
        </p>
      </div>

      {data.map((enrollment) => (
        <div key={enrollment.id} className='mb-6'>
          <h2 className='mb-2 text-xl font-semibold'>
            {enrollment.term} - {enrollment.semester}
          </h2>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border border-gray-300 p-2'>Course Code</th>
                <th className='border border-gray-300 p-2'>Course Name</th>
                <th className='border border-gray-300 p-2'>Grade</th>
                <th className='border border-gray-300 p-2'>Credits</th>
              </tr>
            </thead>
            <tbody>
              {enrollment.grades.map((grade) => (
                <tr key={grade.id}>
                  <td className='border border-gray-300 p-2'>
                    {grade.courseCode}
                  </td>
                  <td className='border border-gray-300 p-2'>
                    {grade.courseName}
                  </td>
                  <td className='border border-gray-300 p-2'>{grade.grade}</td>
                  <td className='border border-gray-300 p-2'>
                    {grade.credits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='mt-2'>
            <p>
              <strong>GPA:</strong> {enrollment.gpa}
            </p>
            <p>
              <strong>CGPA:</strong> {enrollment.cgpa}
            </p>
            <p>
              <strong>Credits:</strong> {enrollment.credits}
            </p>
          </div>
        </div>
      ))}
    </Container>
  );
}
