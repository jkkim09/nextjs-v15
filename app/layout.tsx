import './globals.css';
// import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import Providers from './providers';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import DatadogRum from '@/components/DatadogRum';

dayjs.locale('ko');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${pretendard.variable} font-pretendard antialiased`}
      >
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
            {/* 이미 자동으로 보내고 있음 수동 사용시 config false 필요 */}
            {/* <PageViewTracker /> */}
          </>
        )}

        {process.env.NEXT_PUBLIC_GTA_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTA_ID} />
        )}

        {process.env.NEXT_PUBLIC_DD_APP_ID && <DatadogRum />}
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
