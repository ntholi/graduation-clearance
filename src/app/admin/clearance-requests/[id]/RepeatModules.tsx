import React from 'react';
import {
  Box,
  Title,
  Table,
  Card,
  Badge,
  Text,
  TableTd,
  TableTr,
  TableTbody,
  TableThead,
  TableTh,
} from '@mantine/core';
import { getRepeatModules } from '../../students/actions';

type Props = {
  stdNo: string;
};

type Module = {
  courseCode: string;
  courseName: string;
  grade: string;
  term: string;
  semester: string;
};

const formatSemester = (semesterCode: string) => {
  const year = Math.floor((parseInt(semesterCode) - 1) / 2) + 1;
  const sem = parseInt(semesterCode) % 2 === 1 ? 1 : 2;
  return `Year ${year} Sem ${sem}`;
};

const StudentModuleHistory = ({ modules }: { modules: Module[] }) => {
  const groupedModules = modules.reduce(
    (acc, module) => {
      if (!acc[module.courseCode]) {
        acc[module.courseCode] = [];
      }
      acc[module.courseCode].push(module);
      return acc;
    },
    {} as Record<string, Module[]>,
  );

  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder mt='md'>
      <Table>
        <TableThead>
          <TableTr>
            <TableTh>Course Code</TableTh>
            <TableTh>Course Name</TableTh>
            <TableTh>Initial Semester</TableTh>
            <TableTh>Initial Term</TableTh>
            <TableTh>Grade</TableTh>
            <TableTh>Repeat Info</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {Object.values(groupedModules).map((moduleInstances) => {
            const initialModule = moduleInstances[0];
            const isRepeated = moduleInstances.length > 1;
            const latestModule = moduleInstances[moduleInstances.length - 1];

            return (
              <TableTr key={initialModule.courseCode}>
                <TableTd>{initialModule.courseCode}</TableTd>
                <TableTd>{initialModule.courseName}</TableTd>
                <TableTd>{formatSemester(initialModule.semester)}</TableTd>
                <TableTd>{initialModule.term}</TableTd>
                <TableTd>
                  <Badge
                    color={initialModule.grade.trim() === 'F' ? 'red' : 'green'}
                  >
                    {initialModule.grade.trim()}
                  </Badge>
                </TableTd>
                <TableTd>
                  {isRepeated ? (
                    <Text size='sm'>
                      Repeated in {formatSemester(latestModule.semester)} (Term:{' '}
                      {latestModule.term})
                      <br />
                      Latest Grade:{' '}
                      <Badge color='green'>{latestModule.grade.trim()}</Badge>
                    </Text>
                  ) : initialModule.grade.trim() === 'F' ? (
                    <Badge color='yellow'>Not Repeated</Badge>
                  ) : (
                    'N/A'
                  )}
                </TableTd>
              </TableTr>
            );
          })}
        </TableTbody>
      </Table>
    </Card>
  );
};

export default async function RepeatModules({ stdNo }: Props) {
  const repeatModules = await getRepeatModules(stdNo);

  return (
    <Box>
      <Title order={5} fw='normal'>
        Repeat Modules
      </Title>
      <StudentModuleHistory modules={repeatModules} />
    </Box>
  );
}
