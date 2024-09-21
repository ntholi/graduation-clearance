'use client';

import { NavLink, NavLinkProps } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  key: string | number;
  path: string;
} & NavLinkProps;

export default function ListItem({ key, path, ...props }: Props) {
  const pathname = usePathname();
  return (
    <NavLink
      href={`${path}/${key}`}
      component={Link}
      {...props}
      active={pathname === `${path}/${key}`}
    />
  );
}
