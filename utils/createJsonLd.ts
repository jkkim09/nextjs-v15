// ==========================================
// types + JSON-LD 생성 함수 통합 파일
// 상세 주석 포함 (블로그 + GEO 최적화용)
// ==========================================

// ---------------------
// 1. 타입 정의
// ---------------------

/**
 * 블로그 포스트용 SEO/GEO 정보
 */
export interface BlogPostSEO {
  /** 글 제목 (필수) */
  headline: string;
  /** 글 요약/설명 (필수) */
  description: string;
  /** 작성자 정보 (필수) */
  author: {
    /** 작성자 이름 (필수) */
    name: string;
    /** 작성자 URL (선택) */
    url?: string;
  };
  /** 글 게시일 (ISO 8601, 필수) */
  datePublished: string;
  /** 글 수정일 (ISO 8601, 선택) */
  dateModified?: string;
  /** 글 URL (필수) */
  url: string;
  /** 글 대표 이미지 URL 배열 (선택) */
  image?: string[];
  /** 키워드 배열 (선택, 검색 최적화용) */
  keywords?: string[];
  /** 발행자 정보 (선택) */
  publisher?: {
    /** 발행자 이름 (필수) */
    name: string;
    /** 발행자 로고 URL (선택) */
    logo?: string;
  };
}

/**
 * Product JSON-LD 타입
 * eCommerce, 쇼핑몰 페이지에서 사용
 */
export interface ProductJsonLd {
  /** 상품명 (필수) */
  name: string;
  /** 상품 설명 (선택) */
  description?: string;
  /** SKU (재고관리 코드, 선택) */
  sku?: string;
  /** 브랜드 정보 (선택) */
  brand?: {
    '@type': 'Brand';
    name: string;
  };
  /** 판매 정보 (선택) */
  offers?: {
    '@type': 'Offer';
    url?: string; // 상품 URL
    priceCurrency: string; // 통화 (예: USD, KRW)
    price: string | number; // 가격
    availability?: string; // 재고 상태 (예: https://schema.org/InStock)
  };
  /** 상품 이미지 URL (선택) */
  image?: string | string[];
  /** 상품 페이지 URL (선택) */
  url?: string;
}

/**
 * FAQPage JSON-LD 타입
 * 자주 묻는 질문(FAQ) 페이지에서 사용
 */
export interface FaqJsonLd {
  mainEntity: {
    /** 질문 타입 (필수) */
    '@type': 'Question';
    /** 질문 텍스트 (필수) */
    name: string;
    /** 답변 정보 (필수) */
    acceptedAnswer: {
      '@type': 'Answer';
      /** 답변 텍스트 (필수) */
      text: string;
    };
  }[];
}

/**
 * Organization JSON-LD 타입
 * 회사, 블로그 운영자 등 단체 정보를 표시
 */
export interface OrganizationJsonLd {
  /** 조직/회사 이름 (필수) */
  name: string;
  /** 조직 웹사이트 URL (필수) */
  url: string;
  /** 조직 로고 URL (선택) */
  logo?: string;
  /** 연락처 정보 (선택) */
  contactPoint?: {
    '@type': 'ContactPoint';
    /** 전화번호 (필수) */
    telephone: string;
    /** 연락 유형 (예: customer service) */
    contactType: string;
  }[];
  /** 소셜 프로필 URL 배열 (선택) */
  sameAs?: string[];
}

/**
 * WebSite JSON-LD 타입
 * 전체 웹사이트 정보를 표시 (검색엔진 최적화)
 */
export interface WebSiteJsonLd {
  /** 웹사이트 이름 (필수) */
  name: string;
  /** 웹사이트 URL (필수) */
  url: string;
  /** 검색 가능 정보 (선택) */
  potentialAction?: {
    '@type': 'SearchAction';
    target: string; // 검색 결과 URL
    'query-input': string; // 검색어 입력 형식
  };
}

// ---------------------
// 2. JSON-LD 생성 유틸
// ---------------------

/**
 * JSON-LD 문자열로 변환
 * @param data JSON-LD 객체
 * @returns JSON-LD 문자열 (스크립트 삽입용)
 */
function toJsonLd(data: Record<string, any>): string {
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      ...data,
    },
    null,
    2
  );
}

// ---------------------
// 3. 템플릿 함수
// ---------------------

/**
 * 블로그 포스트용 JSON-LD 생성
 * @param data BlogPostSEO 타입 데이터
 * @returns JSON-LD 문자열
 */
export function createBlogJsonLd(data: BlogPostSEO) {
  return toJsonLd({
    '@type': 'BlogPosting',
    headline: data.headline,
    description: data.description,
    author: {
      '@type': 'Person',
      name: data.author.name,
      ...(data.author.url ? { url: data.author.url } : {}),
    },
    datePublished: data.datePublished,
    ...(data.dateModified ? { dateModified: data.dateModified } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
    url: data.url,
    ...(data.image ? { image: data.image } : {}),
    ...(data.keywords ? { keywords: data.keywords.join(', ') } : {}),
    ...(data.publisher
      ? {
          publisher: {
            '@type': 'Organization',
            name: data.publisher.name,
            ...(data.publisher.logo
              ? {
                  logo: {
                    '@type': 'ImageObject',
                    url: data.publisher.logo,
                  },
                }
              : {}),
          },
        }
      : {}),
  });
}

/**
 * Product JSON-LD 생성
 */
export function createProductJsonLd(data: ProductJsonLd) {
  return toJsonLd({
    '@type': 'Product',
    ...data,
  });
}

/**
 * FAQPage JSON-LD 생성
 */
export function createFaqJsonLd(data: FaqJsonLd) {
  return toJsonLd({
    '@type': 'FAQPage',
    ...data,
  });
}

/**
 * Organization JSON-LD 생성
 */
export function createOrganizationJsonLd(data: OrganizationJsonLd) {
  return toJsonLd({
    '@type': 'Organization',
    ...data,
  });
}

/**
 * WebSite JSON-LD 생성
 */
export function createWebSiteJsonLd(data: WebSiteJsonLd) {
  return toJsonLd({
    '@type': 'WebSite',
    ...data,
  });
}
