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
import { revalidatePath } from 'next/cache';

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

  const failingGrades = new Set(['F', 'PP', 'ANN']);
  const courseCodeCount = new Map<string, number>();
  terms.forEach((term) => {
    term.grades.forEach((grade: { courseCode: string; grade: string }) => {
      if (failingGrades.has(grade.grade)) {
        return;
      }
      const count = courseCodeCount.get(grade.courseCode) || 0;
      courseCodeCount.set(grade.courseCode, count + 1);
    });
  });

  return (
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
              <Text>{student.program}</Text>
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
          <Paper key={term.term} withBorder p='md'>
            <Stack gap='xs'>
              <Text size='sm' fw={500}>
                {term.term}
              </Text>
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
                    <TableTh>Code</TableTh>
                    <TableTh>Module Name</TableTh>
                    <TableTh>Credit</TableTh>
                    <TableTh>Grade</TableTh>
                  </TableTr>
                </TableThead>
                <TableBody>
                  {term.grades.map((grade: any) => (
                    <TableTr key={grade.id}>
                      <TableTd>
                        <Text
                          c={
                            (courseCodeCount.get(grade.courseCode) || 0) > 1
                              ? 'red'
                              : undefined
                          }
                        >
                          {grade.courseCode}
                        </Text>
                      </TableTd>
                      <TableTd>
                        <Group align='center'>
                          {(courseCodeCount.get(grade.courseCode) || 0) > 1 && (
                            <UpdateGradeDialog
                              gradeId={grade.id}
                              currentName={grade.courseName}
                              onUpdate={async () => {
                                'use server';
                                revalidatePath(`/admin/transcripts/${id}`);
                              }}
                            />
                          )}
                          <Text>{grade.courseName}</Text>
                        </Group>
                      </TableTd>
                      <TableTd>
                        <Group align='center' gap={'xs'}>
                          <UpdateCreditsDialog
                            gradeId={grade.id}
                            currentCredits={grade.credits}
                            onUpdate={async () => {
                              'use server';
                              revalidatePath(`/admin/transcripts/${id}`);
                            }}
                          />
                          <Text>{grade.credits}</Text>
                        </Group>
                      </TableTd>
                      <TableTd>{grade.grade}</TableTd>
                    </TableTr>
                  ))}
                </TableBody>
              </Table>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
