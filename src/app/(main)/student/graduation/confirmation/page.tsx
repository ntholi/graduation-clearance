import { auth } from '@/auth';
import Form from './Form';
import { getStudentByUserId } from '@/app/admin/students/actions';

export default async function ConfirmationPage() {
  const session = await auth();
  const student = await getStudentByUserId(session?.user?.id);
  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-4 text-foreground'>
      {student && <Form student={student} />}
    </div>
  );
}
