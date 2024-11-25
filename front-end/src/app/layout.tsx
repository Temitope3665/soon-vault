import Layout from '@/components/layout';
import './globals.css';
import Providers from './providers';
import localFont from 'next/font/local';

import ToastProvider from './providers/ToastProvider';
import { Metadata } from 'next';
import { cn } from '@/libs/utils';
// import AppProvider from './providers/AppProvider';

const satoshi = localFont({
  variable: '--font-sans',
  src: [
    {
      path: './fonts/satoshi/Satoshi-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/satoshi/Satoshi-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/satoshi/Satoshi-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/satoshi/Satoshi-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/satoshi/Satoshi-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'SOONVault Aggregator - SOON',
  description: '',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo.svg',
        href: '/logo.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo.svg',
        href: '/logo.svg',
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
    <html lang="en">
      <body className={cn('font-sans', satoshi.variable)}>
        <Providers>
          <ToastProvider>
            {/* <AppProvider> */}
            <Layout>{children}</Layout>
            {/* </AppProvider> */}
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
