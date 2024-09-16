import React from 'react';
import Navbar from './base/Navbar';
import Gradient from '@/components/ui/Gradient';
import ComingSoonPage from '../ComingSoonPage';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Gradient>
      {/* <Navbar />
      {children} */}
      <ComingSoonPage />
    </Gradient>
  );
}
