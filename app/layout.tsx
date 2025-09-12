'use client';

import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
// import { GoogleAnalytics } from '@next/third-parties/google';
import Providers from './providers';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
// import DatadogRum from '@/components/DatadogRum';

import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import store from '@/stores/store';
import { useState } from 'react';

dayjs.locale('ko');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <html lang="ko" suppressHydrationWarning>
          <TooltipProvider>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              {/* Google Analytics */}
              {/* <GoogleAnalytics gaId="G-9VS4JMKB47" /> */}
              {/* DatadogRum  */}
              {/* <DatadogRum /> */}
              <Providers>
                <main>{children}</main>
                <Toaster />
              </Providers>
            </body>
          </TooltipProvider>
        </html>
      </QueryClientProvider>
    </Provider>
  );
}
