import { createBlogJsonLd } from '@/util/createJsonLd';
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
  const jsonLd = createBlogJsonLd({
    headline: 'Next.js 15과 GEO 최적화 가이드',
    description: 'Generative Engine Optimization(GEO)와 JSON-LD 활용법',
    author: { name: '홍길동', url: 'https://example.com/about' },
    datePublished: '2025-09-16',
    dateModified: '2025-09-16',
    url: 'https://example.com/blog/nextjs15-geo',
    image: ['https://example.com/images/ga4-guide.png'],
    keywords: ['Next.js', 'SEO', 'GEO', 'JSON-LD'],
    publisher: { name: 'My Blog', logo: 'https://example.com/logo.png' },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div>
        <h1>SSR PAGE</h1>
      </div>
    </>
  );
};

export default SSRPage;
