import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';

import { ColorSchemeScript } from '@mantine/core';
import type { Metadata } from 'next';
import Providers from './providers';
import AdminShell from '@admin/base/AdminShell';

export const metadata: Metadata = {
  title: 'Limkokwing Registry',
  description: 'Limkokwing Registry',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>
          <AdminShell>{children}</AdminShell>;
        </Providers>
      </body>
    </html>
  );
}
