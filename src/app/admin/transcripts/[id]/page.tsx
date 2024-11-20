import {
  ActionIcon,
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
import { PrinterIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getTranscript } from '../actions';
import { TableBody } from '@/components/ui/table';
import PrintButton from './PrintButton';

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

        {terms.map((term: any) => (
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
                      <TableTd>{grade.courseCode}</TableTd>
                      <TableTd>{grade.courseName}</TableTd>
                      <TableTd>{grade.credits}</TableTd>
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
