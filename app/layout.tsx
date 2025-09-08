'use client';

import './globals.css';
import { Provider } from 'react-redux';
import { Geist, Geist_Mono } from 'next/font/google';
import store from '@/stores/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Providers from './providers';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko'; // 한국어 로케일 가져오기
dayjs.locale('ko'); //
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul'); // 디폴트

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
            <Providers>
              <main>{children}</main>
            </Providers>
          </body>
        </html>
      </QueryClientProvider>
    </Provider>
  );
};

export default RootLayout;
