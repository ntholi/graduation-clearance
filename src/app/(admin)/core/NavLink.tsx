'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export type NavLinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
};

export default function NavLink({ href, label, icon, badge }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-base text-muted-foreground hover:text-foreground',
        isActive && 'text-foreground',
      )}
    >
      {React.cloneElement(icon as any, { className: 'size-5 md:size-6' })}
      {label}
      {badge && (
        <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
          {badge}
        </Badge>
      )}
    </Link>
  );
}
