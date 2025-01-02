import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import Providers from './providers';
import './globals.css';
import Footer from './student/base/Footer';
import { Toaster } from '@/components/ui/sonner';
import Gradient from '@/components/ui/Gradient';

export const metadata: Metadata = {
  title: 'Graduation Clearance',
  description: 'Limkokwing Registry App, for Graduation Clearance',
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    images: [
      {
        url: '/logo.png',
        width: 1371,
        height: 691,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning>
        <SessionProvider>
          <Providers>
            <Gradient>{children}</Gradient>
            <Footer />
            <Toaster />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
