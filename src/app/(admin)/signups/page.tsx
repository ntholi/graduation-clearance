import db from '@/db';
import { signUps } from '@/db/schema';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { eq } from 'drizzle-orm';
import ApproveButton from './ApproveButton';
import { users } from '@/db/schema/auth';

async function getSignups() {
  const data = await db
    .select()
    .from(signUps)
    .where(eq(signUps.approved, false))
    .innerJoin(users, eq(signUps.userId, users.id));
  return data.map((it) => ({
    ...it.signups,
    user: it.user,
  }));
}

export default async function Signups() {
  const signups = await getSignups();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {signups.map((it) => (
          <TableRow key={it.id}>
            <TableCell>{it.stdNo}</TableCell>
            <TableCell>{it.name}</TableCell>
            <TableCell>{it.user.email}</TableCell>
            <TableCell>
              <ApproveButton id={it.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
