'use client';
import ListItem from '@admin/components/ListItem';
import ListLayout from '@admin/components/ListLayout';
import { PropsWithChildren } from 'react';
import { getBlockedStudents } from '../actions';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      getItems={(page, search) => getBlockedStudents('finance', page, search)}
      path='/admin/blocked-students/finance'
      renderItem={(item, path) => (
        <ListItem
          label={item.stdNo}
          description={item.student?.name}
          id={item.id}
          path={path}
        />
      )}
    >
      {children}
    </ListLayout>
  );
}
