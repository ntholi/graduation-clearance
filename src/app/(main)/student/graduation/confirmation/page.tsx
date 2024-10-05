import { auth } from '@/auth';
import Form from './Form';

export default async function ConfirmationPage() {
  const session = await auth();
  const student = session?.user?.student;
  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-4 text-foreground'>
      {student && <Form student={student} />}
    </div>
  );
}
