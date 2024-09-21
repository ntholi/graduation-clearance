'use client';

import { NavLink, NavLinkProps } from '@mantine/core';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {
  href: string;
  path: string;
} & NavLinkProps;

export default function ListItem({ href, path, ...props }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <NavLink
      href={`${href}?${searchParams.toString()}`}
      component={Link}
      {...props}
      active={pathname === href}
    />
  );
}
