'use client';
import ListItem from '@admin/components/ListItem';
import ListLayout from '@admin/components/ListLayout';
import { PropsWithChildren } from 'react';
import { getClearanceList, Responder } from './actions';
import { useSession } from 'next-auth/react';

export default function Layout({ children }: PropsWithChildren) {
  const { data: session } = useSession();
  let responder: Responder = session?.user?.role as Responder;

  return (
    <ListLayout
      getItems={(page, search) => getClearanceList(responder, page, search)}
      path='/admin/clearance-requests'
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
