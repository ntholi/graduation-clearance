import ListLayout from '@admin/components/ListLayout';
import { PropsWithChildren } from 'react';
import { getStudents } from '../../students/actions';
import ListItem from '@admin/components/ListItem';

type Props = PropsWithChildren & {
  items: React.ReactNode;
};

export default async function Layout({ children, items }: Props) {
  return (
    <ListLayout
      getItems={getStudents}
      path='/admin/students'
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
