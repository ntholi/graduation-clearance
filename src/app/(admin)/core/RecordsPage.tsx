import React from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function RecordsPage({ children, className }: Props) {
  const title = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === RecordsTitle,
  );
  const toolbar = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === RecordsToolbar,
  );
  const otherChildren = React.Children.toArray(children).filter(
    (child) =>
      !React.isValidElement(child) ||
      (child.type !== RecordsToolbar && child.type !== RecordsTitle),
  );

  return (
    <main className={cn('flex flex-1 flex-col gap-2 p-4 lg:p-10', className)}>
      {title}
      {toolbar && <div>{toolbar}</div>}
      <div className='flex flex-1 rounded-lg border border-dashed shadow-sm'>
        {otherChildren}
      </div>
    </main>
  );
}

export function RecordsTitle({ children, className }: Props) {
  return <h1 className={cn('text-lg md:text-2xl', className)}>{children}</h1>;
}

export function RecordsToolbar({ children, className }: Props) {
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
