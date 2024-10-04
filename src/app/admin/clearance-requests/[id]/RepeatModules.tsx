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
  Stack,
  Group,
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

const ModuleAttempt = ({ module }: { module: Module }) => (
  <Group align='start'>
    <Text size='sm'>{module.term.trim()}</Text>
    <Text size='sm' style={{ whiteSpace: 'nowrap' }}>
      {formatSemester(module.semester)}
    </Text>
    <Badge size='sm' color={module.grade.trim() === 'F' ? 'red' : 'green'}>
      {module.grade.trim()}
    </Badge>
  </Group>
);

const StudentModuleHistory = ({ modules }: { modules: Module[] }) => {
  const groupedModules = React.useMemo(() => {
    return modules.reduce(
      (acc, module) => {
        if (!acc[module.courseCode]) {
          acc[module.courseCode] = [];
        }
        acc[module.courseCode].push(module);
        return acc;
      },
      {} as Record<string, Module[]>,
    );
  }, [modules]);

  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder mt='md'>
      <Table striped highlightOnHover verticalSpacing='sm'>
        <TableThead>
          <TableTr>
            <TableTh>Course</TableTh>
            <TableTh>Code</TableTh>
            <TableTh>Attempts</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {Object.values(groupedModules).map((moduleInstances) => {
            const initialModule = moduleInstances[0];
            const repeatAttempts = moduleInstances.slice(1);

            return (
              <TableTr key={initialModule.courseCode}>
                <TableTd style={{ verticalAlign: 'top' }}>
                  {initialModule.courseName}
                </TableTd>
                <TableTd style={{ verticalAlign: 'top' }}>
                  {initialModule.courseCode}
                </TableTd>
                <TableTd style={{ verticalAlign: 'top' }}>
                  <Stack gap='xs'>
                    <ModuleAttempt module={initialModule} />
                    {repeatAttempts.map((attempt, index) => (
                      <ModuleAttempt
                        key={`${attempt.courseCode}-${attempt.term}`}
                        module={attempt}
                      />
                    ))}
                    {repeatAttempts.length === 0 &&
                      initialModule.grade.trim() !== 'F' && (
                        <Text size='sm' c='dimmed'>
                          No repeats
                        </Text>
                      )}
                  </Stack>
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
