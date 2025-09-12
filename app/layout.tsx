import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import Providers from './providers';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';

import { GoogleAnalytics } from '@next/third-parties/google';
import DatadogRum from '@/components/DatadogRum';

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
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {/* <GoogleAnalytics gaId="G-9VS4JMKB47" /> */}
        {process.env.NEXT_PUBLIC_DD_APP_ID && <DatadogRum />}
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
