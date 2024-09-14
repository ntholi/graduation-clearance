import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Container from '@/components/ui/container';

export default function RegistrationPage() {
  return (
    <Container className='flex h-[80vh] items-center justify-center'>
      <Card className='w-full md:w-[400px]'>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Register with your student number details access the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-6'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' placeholder='Your Names' />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='studentNumber'>Student Number</Label>
                <Input id='studentNumber' placeholder='Student Number' />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className='w-full'>Register</Button>
        </CardFooter>
      </Card>
    </Container>
  );
}
