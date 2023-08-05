import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import Nav from '@/app/components/Nav';

import './globals.css';
import { content } from './layout.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Financial Management',
  description: 'Financial Management For HYJ & KYB',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Nav />
          <div className={content}>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
