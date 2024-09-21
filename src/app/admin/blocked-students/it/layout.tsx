import { PropsWithChildren } from 'react';
import ListPage from '../../components/ListPageLayout';
import { getBlockedStudents } from '../actions';

export default async function Layout({ children }: PropsWithChildren) {
  const list = await getBlockedStudents('it');

  return (
    <ListPage
      path='admin/blocked-students/it'
      nav={list.map((item) => ({
        label: item.stdNo,
        description: item.student?.name,
        href: `/admin/blocked-students/it/${item.id}`,
      }))}
    >
      {children}
    </ListPage>
  );
}
