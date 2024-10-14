import { isGraduating } from '@/app/admin/graduating/students/actions';
import { auth } from '@/auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertTriangle, ArrowLeft, CircleHelp } from 'lucide-react';
import Link from 'next/link';
import RequestButton from './RequestButton';

export default async function RequestClearance() {
  const session = await auth();
  const graduating = await isGraduating(session?.user?.student?.stdNo);

  if (!graduating) {
    return (
      <div className='flex h-[80vh] flex-col items-center justify-center p-4'>
        <Alert variant='destructive' className='w-full max-w-md'>
          <AlertTriangle className='h-4 w-4' />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>
            Your name was not found in the graduation list. Please consult your
            faculty or registry department for more information.
          </AlertDescription>
        </Alert>
        <Button asChild className='mt-4 w-full max-w-md'>
          <Link href='/student' className='flex items-center gap-2'>
            <ArrowLeft className='size-4' /> <span>Back</span>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='flex h-[80vh] items-center justify-center p-4'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle>Clearance Request</CardTitle>
          <CardDescription>
            Your clearance request will be processed by the respective
            departments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='rounded-lg px-2 shadow-sm'>
            <h3 className='mb-4 text-lg'>Departments</h3>
            <ul className='space-y-3'>
              {['Faculty', 'Library', 'Finance', 'Resource'].map(
                (dept, index) => (
                  <li key={index} className='flex items-center space-x-3'>
                    <CircleHelp className='size-4' />
                    <span className='text-sm'>{dept}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </CardContent>
        <CardFooter className='mt-6'>
          <RequestButton
            stdNo={session?.user?.student?.stdNo}
            disabled={!graduating}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
