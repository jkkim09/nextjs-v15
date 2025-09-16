import { createBlogJsonLd } from '@/utils/createJsonLd';
import { getServerSideUrlPath } from '@/utils/getServerSide';
import { createMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

interface PageProps {
  params: { route: string };
}

const getTestApi = async () => {
  return {
    title: 'Next.js 15 GEO 최적화 가이드',
    description:
      'Next.js 15 App Router 환경에서 GEO/SEO/JSON-LD를 통합 적용하는 방법',
  };
};

export async function generateMetadata(): Promise<Metadata> {
  // SSR 시 headers()에서 request 정보 접근 가능
  const url = await getServerSideUrlPath();
  const { title, description } = await getTestApi();

  return createMetadata({
    title: title,
    description: description,
    url: url,
    image: 'https://example.com/images/ga4-guide.png',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@example',
    keywords: ['Next.js', 'SEO', 'GEO', 'JSON-LD'],
    author: '홍길동',
  });
}

const SSRPage = async ({ params }: PageProps) => {
  const url = await getServerSideUrlPath();
  const jsonLd = createBlogJsonLd({
    headline: 'Next.js 15과 GEO 최적화 가이드',
    description: 'Generative Engine Optimization(GEO)와 JSON-LD 활용법',
    author: { name: '홍길동', url: url },
    datePublished: '2025-09-16',
    dateModified: '2025-09-16',
    url: url,
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
