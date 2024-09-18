import { PropsWithChildren } from 'react';
import ListPage from '../../components/ListPage';
import { getBlockedStudents } from '../actions';

export default async function Layout({ children }: PropsWithChildren) {
  const list = await getBlockedStudents('resource');

  return (
    <ListPage
      path='admin/blocked-students/resource'
      nav={list.map((item) => ({
        label: item.stdNo,
        description: item.student?.name,
        href: `/admin/blocked-students/resource/${item.id}`,
      }))}
    >
      {children}
    </ListPage>
  );
}