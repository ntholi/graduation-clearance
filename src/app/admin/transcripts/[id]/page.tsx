import { TableBody } from '@/components/ui/table';
import {
  Box,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Table,
  TableCaption,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
  Title,
} from '@mantine/core';
import { notFound } from 'next/navigation';
import { getTranscript } from '../actions';
import PrintButton from './PrintButton';
import UpdateGradeDialog from './UpdateGradeDialog';
import UpdateCreditsDialog from './UpdateCreditsDialog';
import UpdateProgramDialog from './UpdateProgramDialog';
import DeleteGradeDialog from './DeleteGradeDialog';
import UpdateCompletionDateDialog from './UpdateCompletionDateDialog';
import { revalidatePath } from 'next/cache';
import TranscriptProvider, {
  completionDateAtom,
} from './components/TranscriptProvider';
import TermWrapper from './components/TermWrapper';
import CompletionDateDisplay from './components/CompletionDateDisplay';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Props) {
  const data = await getTranscript(id);
  if (!data) {
    return notFound();
  }

  const { student, terms } = data;

  const duplicateCourses = new Set<string>();
  const duplicateCourseNames = new Set<string>();
  const courseCodeCounts = new Map<string, number>();
  const courseNameCounts = new Map<string, number>();

  const failedCourses = terms.reduce((acc, term) => {
    const failed = term.grades.filter((grade: { grade: string }) =>
      ['F', 'PP', 'ANN'].includes(grade.grade),
    );
    return acc.concat(failed);
  }, []);

  terms.forEach((term) => {
    term.grades.forEach((grade: { courseCode: string; courseName: string }) => {
      courseCodeCounts.set(
        grade.courseCode,
        (courseCodeCounts.get(grade.courseCode) || 0) + 1,
      );
      courseNameCounts.set(
        grade.courseName,
        (courseNameCounts.get(grade.courseName) || 0) + 1,
      );
    });
  });

  courseCodeCounts.forEach((count, courseCode) => {
    if (
      count > 1 &&
      !failedCourses.some(
        (course: { courseCode: string }) => course.courseCode === courseCode,
      )
    ) {
      duplicateCourses.add(courseCode);
    }
  });

  courseNameCounts.forEach((count, courseName) => {
    if (
      count > 1 &&
      !failedCourses.some(
        (course: { courseName: string }) => course.courseName === courseName,
      )
    ) {
      duplicateCourseNames.add(courseName);
    }
  });

  return (
    <TranscriptProvider>
      <Box p={'lg'}>
        <Flex justify={'space-between'} align={'center'}>
          <Title order={3} fw={100}>
            Academic Transcript
          </Title>
          <PrintButton />
        </Flex>
        <Divider my={15} />

        <Stack p={'xl'}>
          <Paper withBorder p='md'>
            <Group justify='space-between'>
              <Box>
                <Text size='sm' c='dimmed'>
                  Student Name
                </Text>
                <Text>{student.name}</Text>
              </Box>
              <Box>
                <Text size='sm' c='dimmed'>
                  Student ID
                </Text>
                <Text>{student.stdNo}</Text>
              </Box>
              <Box>
                <Text size='sm' c='dimmed'>
                  Programme
                </Text>
                <Group align='center' gap={5}>
                  <UpdateProgramDialog
                    stdNo={student.stdNo}
                    currentProgram={student.program || ''}
                    onUpdate={async () => {
                      'use server';
                      revalidatePath(`/admin/transcripts/${id}`);
                    }}
                  />
                  <Text>{student.program || 'Not Set'}</Text>
                </Group>
              </Box>
              <Box>
                <Text size='sm' c='dimmed'>
                  Date of Completion
                </Text>
                <Group align='center' gap={5}>
                  <UpdateCompletionDateDialog currentDate='November 2024' />
                  <CompletionDateDisplay />
                </Group>
              </Box>
              <Box>
                <Text size='sm' c='dimmed'>
                  Nationality
                </Text>
                <Text>{student.nationality}</Text>
              </Box>
            </Group>
          </Paper>

          {terms.map((term) => (
            <TermWrapper key={term.id} termId={term.id} termName={term.term}>
              <Table>
                <TableCaption>
                  <Group justify='space-between'>
                    <Group gap='xl'>
                      <Text size='xs'>GPA: {term.gpa}</Text>
                      <Text size='xs'>CGPA: {term.cgpa}</Text>
                    </Group>
                    <Text size='xs'>Credits Earned: {term.credits}</Text>
                  </Group>
                </TableCaption>
                <TableThead>
                  <TableTr>
                    <TableTh w={80}>Code</TableTh>
                    <TableTh w={600}>Module Name</TableTh>
                    <TableTh w={60}>Credit</TableTh>
                    <TableTh>Grade</TableTh>
                  </TableTr>
                </TableThead>
                <TableBody>
                  {term.grades.map((grade: any) => (
                    <TableTr key={grade.id}>
                      <TableTd>
                        <Text
                          c={
                            duplicateCourses.has(grade.courseCode)
                              ? 'red'
                              : undefined
                          }
                          size='sm'
                        >
                          {grade.courseCode}
                        </Text>
                      </TableTd>
                      <TableTd>
                        <Group align='center'>
                          <UpdateGradeDialog
                            gradeId={grade.id}
                            currentName={grade.courseName}
                            color={
                              duplicateCourses.has(grade.courseCode) ||
                              duplicateCourseNames.has(grade.courseName)
                                ? 'red'
                                : 'dimmed'
                            }
                            onUpdate={async () => {
                              'use server';
                              revalidatePath(`/admin/transcripts/${id}`);
                            }}
                          />

                          <Text
                            size='sm'
                            c={
                              duplicateCourseNames.has(grade.courseName)
                                ? 'red'
                                : undefined
                            }
                          >
                            {grade.courseName}
                          </Text>
                        </Group>
                      </TableTd>{' '}
                      <TableTd>
                        <Group align='center' gap={5}>
                          <UpdateCreditsDialog
                            gradeId={grade.id}
                            currentCredits={grade.credits}
                            onUpdate={async () => {
                              'use server';
                              revalidatePath(`/admin/transcripts/${id}`);
                            }}
                          />
                          <Text
                            c={
                              !grade.courseCode.endsWith(grade.credits) ||
                              grade.credits < 6
                                ? 'red'
                                : undefined
                            }
                            size='sm'
                          >
                            {grade.credits}
                          </Text>
                        </Group>
                      </TableTd>
                      <TableTd>
                        <Group align='center' gap={5}>
                          <Text size='sm'>{grade.grade}</Text>
                          <DeleteGradeDialog
                            gradeId={grade.id}
                            courseCode={grade.courseCode}
                            courseName={grade.courseName}
                            onDelete={async () => {
                              'use server';
                              revalidatePath(`/admin/transcripts/${id}`);
                            }}
                          />
                        </Group>
                      </TableTd>
                    </TableTr>
                  ))}
                </TableBody>
              </Table>
            </TermWrapper>
          ))}
        </Stack>
      </Box>
    </TranscriptProvider>
  );
}
