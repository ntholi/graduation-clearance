import { getGraduationConfirmation } from '@/app/admin/graduating/confirmations/actions';
import { auth } from '@/auth';
import Container from '@/components/ui/container';
import { redirect } from 'next/navigation';
import Body from './Body';

export default async function ClearancePage() {
  const session = await auth();
  const confirmation = await getGraduationConfirmation(session?.user?.stdNo);

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
          <Body />
        </div>
      </Container>
    </div>
  );
}
