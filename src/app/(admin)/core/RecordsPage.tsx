import React from 'react';
import RecordsToolbar from './RecordsToolbar';

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function RecordsPage({ children, title }: Props) {
  const toolbar = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === RecordsToolbar,
  );
  const otherChildren = React.Children.toArray(children).filter(
    (child) => !React.isValidElement(child) || child.type !== RecordsToolbar,
  );

  return (
    <main className='flex flex-1 flex-col gap-2 p-4 lg:p-10'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-lg md:text-2xl'>{title}</h1>
        {toolbar && <div>{toolbar}</div>}
      </div>
      <div className='flex flex-1 rounded-lg border border-dashed shadow-sm'>
        {otherChildren}
      </div>
    </main>
  );
}
