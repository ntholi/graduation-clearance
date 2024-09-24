'use client';
import React from 'react';
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

type Props = {
  student: {
    name: string | null;
    program: string | null;
  };
};
export default function Form({ student }: Props) {
  const [confirmed, setConfirmed] = React.useState(false);

  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
    setConfirmed(checked === true);
  };
  return (
    <Card className='w-full max-w-md -translate-y-20'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>
          Graduation Clearance
        </CardTitle>
        <CardDescription>
          Your clearance has been completed successfully, please confirm the
          details below
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <Label className='font-semibold text-muted-foreground'>
            Student Name
          </Label>
          <p>{student.name}</p>
        </div>
        <div>
          <Label className='font-semibold text-muted-foreground'>
            Program of Study
          </Label>
          <p>{student.program}</p>
        </div>
        <div className='flex items-center space-x-2'>
          <Checkbox
            id='confirmation'
            checked={confirmed}
            onCheckedChange={handleCheckboxChange}
          />
          <Label htmlFor='confirmation' className='text-sm'>
            I confirm that the information above is correct
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full' disabled={!confirmed}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
