'use client';
import ListLayout from '@admin/components/ListLayout';
import { PropsWithChildren } from 'react';
import { getStudents } from './actions';
import ListItem from '@admin/components/ListItem';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      getItems={getStudents}
      path='/admin/transcripts'
      renderItem={(item, path) => (
        <ListItem
          label={item.stdNo}
          description={item.name}
          id={item.stdNo}
          path={path}
        />
      )}
    >
      {children}
    </ListLayout>
  );
}
