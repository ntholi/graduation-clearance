'use client';
import ListItem from '@admin/components/ListItem';
import ListLayout from '@admin/components/ListLayout';
import { PropsWithChildren } from 'react';
import { getGraduatingStudents } from './actions';

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      getItems={(page, search) => getGraduatingStudents(page, search)}
      path='/admin/graduating-students'
      renderItem={(item, path) => (
        <ListItem
          label={item.stdNo}
          description={item.student?.name}
          id={item.stdNo}
          path={path}
        />
      )}
    >
      {children}
    </ListLayout>
  );
}
