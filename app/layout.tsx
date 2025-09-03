'use client';

import './globals.css';
import { Provider } from 'react-redux';
import { Geist, Geist_Mono } from 'next/font/google';
import store from '@/stores/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const queryClient = new QueryClient();

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <html lang="ko" suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <main>{children}</main>
          </body>
        </html>
      </QueryClientProvider>
    </Provider>
  );
};

export default RootLayout;
