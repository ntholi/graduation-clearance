'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSignUp, signUpStudent } from './actions';
import { signUpSchema } from './schema';

export function SignUpForm() {
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      studentNumber: '',
    },
  });

  useEffect(() => {
    getSignUp()
      .then((signUp) => {
        if (signUp && 'name' in signUp) {
          form.reset({
            name: signUp.name,
            studentNumber: signUp.stdNo.toString(),
          });
          setSubmitted(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    await signUpStudent(values);
    setSubmitted(true);
  }

  return (
    <Form {...form}>
      {submitted && (
        <div className='flex items-center gap-2 rounded border p-2 text-green-400'>
          <CheckCircle className='size-4' />
          <p className='text-sm'>
            Your request has been submitted, waiting approval
          </p>
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          disabled={loading}
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Full Names' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='studentNumber'
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Number</FormLabel>
              <FormControl>
                <Input placeholder='Student Number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full'
          disabled={form.formState.isSubmitting || loading}
        >
          {form.formState.isSubmitting && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          )}
          {submitted ? 'Update' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
