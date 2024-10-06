'use client';
import React, { useTransition } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import saveConfirmation from './actions';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  student: {
    stdNo: string;
    name: string | null;
    program: string | null;
  };
};
export default function Form({ student }: Props) {
  const [confirmed, setConfirmed] = React.useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
    setConfirmed(checked === true);
  };

  function handleSubmit() {
    startTransition(async () => {
      await saveConfirmation({ stdNo: student.stdNo, confirmed });
      router.push('/student/graduation/success?ref=confirmation');
    });
  }

  return (
    <Card className='w-full max-w-md -translate-y-20'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>
          Graduation Clearance
        </CardTitle>
        <CardDescription>
          Please confirm the details below to complete your graduation
          clearance, if there are any discrepancies, please contact the registry
          department
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <Label>Your Name</Label>
          <p className='text-sm text-green-500 dark:text-green-400'>
            As will be printed on your certificate
          </p>
          <p className='text-xl'>{student.name}</p>
        </div>
        <div>
          <Label>Program of Study</Label>
          <p className='text-lg'>{student.program}</p>
        </div>
        <div className='flex items-center space-x-2'>
          <Checkbox
            id='confirmation'
            checked={confirmed}
            onCheckedChange={handleCheckboxChange}
          />
          <Label htmlFor='confirmation' className='text-sm font-light'>
            I confirm that the information above is correct and there will be no
            changes to the information provided after I submit this form
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className='w-full'
          disabled={!confirmed || pending}
          onClick={handleSubmit}
        >
          {pending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Confirm
        </Button>
      </CardFooter>
    </Card>
  );
}
