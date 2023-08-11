import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import Nav from '@/app/components/Nav';

import AuthProvider from './components/AuthContainer';
import './globals.css';
import { content } from './layout.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Financial Management',
  description: 'Financial Management For HYJ & KYB',
  viewport: 'width=device-width, initial-scale=1.0, user-scalable=no,maximum-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <Nav />
            <div className={content}>{children}</div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
