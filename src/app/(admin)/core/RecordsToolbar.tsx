import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function RecordsToolbar({ children, className }: Props) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-md border bg-muted/40 p-2',
        className,
      )}
    >
      {children}
    </div>
  );
}
