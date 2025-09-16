// ==========================================
// Next.js 15 App Router용 Metadata 유틸
// 타입 + 상세 주석 포함
// ==========================================

import { Metadata } from 'next';

/**
 * Open Graph 타입
 */
export type OpenGraphType = 'website' | 'article' | 'blog' | 'profile' | string;

/**
 * Twitter Card 타입
 */
export type TwitterCardType =
  | 'summary'
  | 'summary_large_image'
  | 'app'
  | 'player';

/**
 * SEO/Metadata 공통 타입
 */
export interface PageMetadata {
  /** 페이지 제목 (필수) */
  title: string;
  /** 페이지 설명 (선택, 검색엔진 요약) */
  description?: string;
  /** 페이지 URL (선택, canonical) */
  url?: string;
  /** 대표 이미지 URL (선택) */
  image?: string;
  /** Open Graph 타입 (선택) */
  ogType?: OpenGraphType;
  /** Twitter 카드 타입 (선택) */
  twitterCard?: TwitterCardType;
  /** Twitter 계정 (선택, @username) */
  twitterSite?: string;
  /** 메타 키워드 (선택) */
  keywords?: string[];
  /** 페이지 작성자 정보 (선택) */
  author?: string;
  /** JSON-LD 데이터 (선택, 구조화 데이터) */
  jsonLd?: Record<string, any> | Record<string, any>[];
}

/**
 * Next.js 15 App Router용 Metadata 객체 생성 함수
 * @param data PageMetadata 타입
 * @returns Next.js Metadata 형식 객체
 */
export function createMetadata(data: PageMetadata): Metadata {
  const metadata: any = {
    title: data.title,
    description: data.description,
    keywords: data.keywords?.join(', '),
    authors: data.author ? [{ name: data.author }] : undefined,
    openGraph:
      data.ogType || data.image
        ? {
            type: data.ogType || 'website',
            title: data.title,
            description: data.description,
            url: data.url,
            images: data.image ? [{ url: data.image }] : undefined,
          }
        : undefined,
    twitter:
      data.twitterCard || data.twitterSite
        ? {
            card: data.twitterCard || 'summary_large_image',
            site: data.twitterSite,
            title: data.title,
            description: data.description,
            images: data.image ? [data.image] : undefined,
          }
        : undefined,
    alternates: data.url ? { canonical: data.url } : undefined,
  };

  // JSON-LD가 있으면 <script type="application/ld+json">용 문자열로 변환
  if (data.jsonLd) {
    metadata.jsonLd = Array.isArray(data.jsonLd)
      ? data.jsonLd.map((obj) => JSON.stringify(obj, null, 2))
      : [JSON.stringify(data.jsonLd, null, 2)];
  }

  return metadata;
}
