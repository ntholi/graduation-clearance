import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function RecordsToolbar({ children }: Props) {
  return <div className='flex items-center justify-between'>{children}</div>;
}
