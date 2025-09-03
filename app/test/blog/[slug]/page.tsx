// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';

// 동적 메타데이터
export async function generateMetadata(): Promise<Metadata> {
  //   {
  //       params,
  //   }: {
  //     params: { slug: string };
  //   }
  // ... (API 호출 등)
  //   const article = await getArticle(params.slug);
  const article = {
    title: 'Sample Article',
    summary: 'This is a sample article.',
  };

  return {
    title: article.title,
    description: article.summary,
  };
}

export default async function ArticlePage() {
//   {
//       params,
//   }: {
//     params: { slug: string };
//   }
  //   const article = await getArticle(params.slug);
  const article = {
    title: 'Sample Article',
    summary: 'This is a sample article.',
    image: '',
    publishedAt: new Date(),
    authorName: 'John Doe',
    content: 'This is the content of the sample article.',
  };

  // JSON-LD 스키마 마크업
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: article.image,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Your Company',
      logo: {
        '@type': 'ImageObject',
        url: 'https://example.com/logo.png',
      },
    },
  };

  return (
    <>
      {/* Schema.org 마크업 추가 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </>
  );
}
