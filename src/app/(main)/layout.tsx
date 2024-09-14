import React from 'react';
import Navbar from './base/Navbar';
import Gradient from '@/components/ui/Gradient';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Gradient>
      <Navbar />
      {children}
    </Gradient>
  );
}