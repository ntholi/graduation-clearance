import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import db from '@/db';
import { signupRequests } from '@/db/schema';
import { users } from '@/db/schema/auth';
import { eq } from 'drizzle-orm';
import RecordsPage from '../core/RecordsPage';
import ApproveButton from './ApproveButton';

async function getSignupRequests() {
  const data = await db
    .select()
    .from(signupRequests)
    .innerJoin(users, eq(signupRequests.userId, users.id));
  return data.map((it) => ({
    ...it.signup_requests,
    user: it.user,
  }));
}

export default async function SignupRequestsPage() {
  const signupRequests = await getSignupRequests();

  return (
    <RecordsPage title='Sign Up Requests'>
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
          {signupRequests.map((it) => (
            <TableRow key={it.id}>
              <TableCell>{it.stdNo}</TableCell>
              <TableCell>{it.name}</TableCell>
              <TableCell>{it.user.email}</TableCell>
              <TableCell>
                <ApproveButton value={it} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </RecordsPage>
  );
}
