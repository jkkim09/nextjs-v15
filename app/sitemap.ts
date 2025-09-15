// app/sitemap.ts
import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// DB 또는 API에서 블로그 ID를 가져오는 함수라고 가정
async function getBlogIds() {
  return [12, 13, 14]; // 예시: 실제로는 DB 쿼리 등
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogIds = await getBlogIds();
  return [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    // 동적 경로
    ...blogIds.map((id) => ({
      url: `${siteUrl}/blog/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
