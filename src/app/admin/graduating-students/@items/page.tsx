import { NavLink } from '@mantine/core';
import Link from 'next/link';
import ListContainer from '../../components/ListContainer';
import { getGraduatingStudents } from '../actions';
import ListItem from '../../components/ListItem';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ItemsPage({ searchParams }: Props) {
  const { items, totalPages } = await getGraduatingStudents(
    Number(searchParams?.page),
  );
  return (
    <ListContainer total={totalPages}>
      {items.map((item) => (
        <ListItem
          key={item.stdNo}
          path='/admin/graduating-students'
          label={item.stdNo}
        />
      ))}
    </ListContainer>
  );
}
