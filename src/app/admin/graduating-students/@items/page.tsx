import { NavLink, NavLinkProps } from '@mantine/core';
import Link from 'next/link';
import { getGraduatingStudents } from '../actions';
import ItemsContainer from '../../components/ItemsContainer';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ItemsPage({ searchParams }: Props) {
  console.log({ searchParams });
  const { items, totalPages } = await getGraduatingStudents();
  return (
    <ItemsContainer>
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
