'use client';
import ListItem from '@admin/components/ListItem';
import ListLayout from '@admin/components/ListLayout';
import { PropsWithChildren } from 'react';
import { getClearanceList } from './actions';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      getItems={(page, search) => getClearanceList(page, search)}
      path='/admin/finance-clearance'
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
