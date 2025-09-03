import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'My Next.js Site', // 기본 제목
    template: '%s | My Next.js Site', // 페이지 제목 + 접미사
  },
  description: 'Next.js 15와 TypeScript를 활용한 웹사이트입니다.',
  authors: [{ name: 'Gemini', url: 'https://example.com' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://example.com',
    siteName: 'My Next.js Site',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Next.js Site',
    description: 'Next.js 15와 TypeScript를 활용한 웹사이트입니다.',
  },
};

const SSRPage = () => {
  console.log('SSR -----');
  return (
    <div>
      <h1>SSR PAGE</h1>
    </div>
  );
};

export default SSRPage;
