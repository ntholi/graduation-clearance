'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { addBlockedStudent } from '../actions';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import RecordsPage from '../../core/RecordsPage';

const formSchema = z.object({
  stdNo: z.number().int().positive(),
  blockedBy: z.enum(['finance', 'library', 'resource', 'it']),
  reason: z.string().min(1).max(500),
});

export default function NewBlockedStudentPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stdNo: undefined,
      blockedBy: undefined,
      reason: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addBlockedStudent(values);
      toast('Student blocked successfully', {
        description: `Student ${values.stdNo} has been blocked.`,
      });
      router.push('/blocked-students');
    } catch (error) {
      toast.error('Error', {
        description: 'Failed to block student. Please try again.',
      });
    }
  }

  return (
    <RecordsPage title='Add Blocked Student'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='stdNo'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Number</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='blockedBy'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blocked By</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select department' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='finance'>Finance</SelectItem>
                    <SelectItem value='library'>Library</SelectItem>
                    <SelectItem value='resource'>
                      Resource Department
                    </SelectItem>
                    <SelectItem value='it'>IT Department</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='reason'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </Form>
    </RecordsPage>
  );
}
