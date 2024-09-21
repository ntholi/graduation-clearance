import { NavLink, NavLinkProps } from '@mantine/core';
import Link from 'next/link';
import { getGraduatingStudents } from '../actions';
import ItemsContainer from '../../components/ItemsContainer';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ItemsPage({ searchParams }: Props) {
  const { items, totalPages } = await getGraduatingStudents(
    Number(searchParams?.page),
  );
  return (
    <ItemsContainer total={totalPages}>
      {items.map((item) => (
        <NavLink
          href={`/admin/graduating-students/${item.stdNo}`}
          key={item.stdNo}
          label={item.stdNo}
          component={Link}
          // active={pathname === item.href}
        />
      ))}
    </ItemsContainer>
  );
}
