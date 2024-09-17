import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import db from '@/db';
import { blockedStudents, students } from '@/db/schema';
import { eq } from 'drizzle-orm';
import RecordsPage from '../core/RecordsPage';
import RecordsToolbar from '../core/RecordsToolbar';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

async function getBlockedStudents() {
  const data = await db
    .select()
    .from(blockedStudents)
    .leftJoin(students, eq(blockedStudents.stdNo, students.stdNo));
  return data.map((it) => ({
    ...it.blocked_students,
    student: it.students,
  }));
}

export default async function SignupRequestsPage() {
  const data = await getBlockedStudents();

  return (
    <RecordsPage title='Blocked Students'>
      <RecordsToolbar className='justify-between'>
        <div className='flex gap-2'>
          <Button variant='outline' size='sm' asChild>
            <Link href='/blocked-students/new'>New</Link>
          </Button>
        </div>
        <Button variant='outline' size='sm'>
          <FileSpreadsheet className='mr-2 h-4 w-4' />
          Import
        </Button>
      </RecordsToolbar>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Blocked By</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((it) => (
            <TableRow key={it.id}>
              <TableCell>{it.stdNo}</TableCell>
              <TableCell>{it.student?.name}</TableCell>
              <TableCell>{it.blockedBy}</TableCell>
              <TableCell>{it.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </RecordsPage>
  );
}
