'use client';
import ListItem from '@admin/components/ListItem';
import ListLayout from '@admin/components/ListLayout';
import { PropsWithChildren } from 'react';
import { getGraduatingStudents, saveGraduationList } from './actions';
import SheetReader from '../../base/SheetReader';
import { useSession } from 'next-auth/react';

export default function Layout({ children }: PropsWithChildren) {
  const { data: session } = useSession();
  return (
    <ListLayout
      getItems={(page, search) => getGraduatingStudents(page, search)}
      path='/admin/graduating/students'
      renderItem={(item, path) => (
        <ListItem
          label={item.stdNo}
          description={item.student?.name}
          id={item.stdNo}
          path={path}
        />
      )}
      actionIcons={[
        session?.user?.role === 'admin' && (
          <SheetReader
            action={async (items) => {
              await saveGraduationList(items);
            }}
          />
        ),
      ]}
    >
      {children}
    </ListLayout>
  );
}
