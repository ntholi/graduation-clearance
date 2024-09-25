import Container from '@/components/ui/container';
import Body from './Body';
import ClearanceStatusButton from './NextButton';
import { auth } from '@/auth';
import { getStudentByUserId } from '@/app/admin/students/actions';
import { getGraduationConfirmation } from '@/app/admin/graduating/confirmations/actions';
import { redirect } from 'next/navigation';

export default async function ClearancePage() {
  const session = await auth();
  const student = await getStudentByUserId(session?.user?.id);
  const confirmation = await getGraduationConfirmation(student?.stdNo);

  if (confirmation?.cleared && confirmation.confirmed) {
    return redirect('/student/graduation/success');
  } else if (confirmation?.cleared) {
    return redirect('/student/graduation/confirmation');
  }

  return (
    <div className='min-h-screen bg-muted/20'>
      <Container className='pb-5'>
        <div className='mx-auto max-w-2xl'>
          <h1 className='py-8 text-center text-3xl font-semibold text-gray-800 dark:text-gray-200'>
            Graduation Clearance
          </h1>
          <ClearanceStatusButton className='my-4' />
          <Body />
        </div>
      </Container>
    </div>
  );
}
