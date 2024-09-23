import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Container from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function TranscriptPageSkeleton() {
  return (
    <Container className='mx-auto mt-10' width='md'>
      <Card className='mb-4'>
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-6 w-24' />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='mb-2 h-4 w-3/4' />
          <Skeleton className='mb-2 h-4 w-1/2' />
          <Skeleton className='h-4 w-2/3' />
        </CardContent>
      </Card>

      {[...Array(3)].map((_, index) => (
        <Card key={index} className='mb-4'>
          <CardHeader>
            <CardTitle className='text-base font-normal'>
              <Skeleton className='mb-2 h-4 w-1/2' />
              <Skeleton className='h-4 w-1/3' />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Skeleton className='h-4 w-12' />
                  </TableHead>
                  <TableHead className='min-w-64'>
                    <Skeleton className='h-4 w-40' />
                  </TableHead>
                  <TableHead>
                    <Skeleton className='h-4 w-12' />
                  </TableHead>
                  <TableHead>
                    <Skeleton className='h-4 w-16' />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(4)].map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>
                      <Skeleton className='h-4 w-12' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-40' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-8' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-8' />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className='mt-4 flex justify-between'>
              <div>
                <Skeleton className='h-4 w-32' />
              </div>
              <Skeleton className='h-4 w-24' />
            </div>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
