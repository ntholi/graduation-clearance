import React from 'react';

type Props = {
  title: string;
  children?: React.ReactElement;
};
export default function RecordsPage({ children, title }: Props) {
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10'>
      <div className='flex items-center'>
        <h1 className='text-lg font-semibold md:text-2xl'>{title}</h1>
      </div>
      <div className='flex flex-1 rounded-lg border border-dashed shadow-sm'>
        {children}
      </div>
    </main>
  );
}
