import React from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Page({ children, className }: Props) {
  const header = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === PageHeader,
  );
  const body = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === PageBody,
  );

  return (
    <main
      className={cn(
        'flex flex-1 flex-col gap-2 p-4 md:gap-4 lg:p-10',
        className,
      )}
    >
      {header}
      {body}
    </main>
  );
}

export function PageHeader({ children, className }: Props) {
  const title = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === PageTitle,
  );
  const toolbar = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === PageToolbar,
  );

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {title}
      {toolbar}
    </div>
  );
}

export function PageTitle({ children, className }: Props) {
  return <h1 className={cn('text-lg md:text-2xl', className)}>{children}</h1>;
}

export function PageToolbar({ children, className }: Props) {
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

export function PageBody({ children, className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-1 rounded-lg border border-dashed shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}
