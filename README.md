```html
<!DOCTYPE html> : 이 문서를 HTML5로 선언하는 가장 기본적인 줄입니다.

<head> : 웹 페이지의 메타데이터를 담는 부분으로, 브라우저에 표시되지 않아요.

<meta> : 문서의 정보를 정의합니다. charset="UTF-8"은 한글이 깨지지 않게 해주고, viewport는 모바일 환경에서 올바르게 보이게 합니다.

<title> : 브라우저 탭에 표시될 페이지 제목입니다.

<body> : 웹 페이지에 실제로 보이는 모든 콘텐츠를 포함합니다.

<header> : 페이지의 헤더(로고, 메뉴 등)를 정의합니다.

<nav> : 내비게이션 링크들을 담는 영역입니다.

<h1> ~ <h6> : 제목 태그로, 숫자가 작을수록 중요한 제목입니다.

<ul>, <li> : 순서 없는 목록과 목록 아이템을 만듭니다.

<a> : 다른 페이지로 연결되는 하이퍼링크를 만듭니다.

<main> : 문서의 주요 콘텐츠를 담는 영역입니다.

<section> : 문서의 독립적인 섹션을 정의합니다. <section>은 의미론적으로 관련 콘텐츠를 그룹화할 때 사용해요.

<div> : 특별한 의미 없이 콘텐츠를 묶는 데 사용되는 범용 컨테이너 태그입니다. 주로 CSS 스타일을 적용하기 위해 사용해요.

<p> : 단락(paragraph)을 나타냅니다.

<strong>, <b> : 텍스트를 굵게 만듭니다. <strong>은 중요한 텍스트임을 의미하는 반면, <b>는 단순히 굵게 표시하는 용도입니다.

<br> : 줄바꿈을 합니다.

<img> : 이미지를 삽입하는 태그입니다.

<figure>, <figcaption> : 이미지나 다이어그램 같은 콘텐츠를 독립적인 단위로 묶고, 그에 대한 캡션을 제공합니다.

<hr> : 가로줄을 그어 콘텐츠를 구분합니다.

<article> : 독립적이고 자체 포함된 콘텐츠를 정의합니다. 블로그 게시물이나 뉴스 기사 등이 이에 해당합니다.

<form>, <label>, <input>, <textarea>, <button> : 사용자의 입력을 받는 양식을 만듭니다.

<footer> : 페이지의 바닥글(저작권 정보 등)을 정의합니다.

<strong>	중요성 강조	의미를 전달하는 데 중점. 스크린 리더도 중요하게 읽어줍니다.
<span>	의미 없음	스타일링 또는 스크립트 적용을 위한 구분자. 의미를 전달하지 않습니다.

```

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>자주 사용하는 HTML 태그 예제</title>
  </head>

  <body>
    <header>
      <h1>나의 웹사이트</h1>
      <nav>
        <ul>
          <li><a href="#about">소개</a></li>
          <li><a href="#services">서비스</a></li>
          <li><a href="#contact">연락처</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section id="about">
        <h2>회사 소개</h2>
        <p>
          우리 회사는 <strong>최고의 기술력</strong>으로 고객 만족을 위해
          노력합니다.
        </p>
      </section>

      <section id="services">
        <h2>제공 서비스</h2>
        <div>
          <h3>웹 개발</h3>
          <p>최신 기술을 활용한 반응형 웹사이트 제작</p>
        </div>
      </section>

      <section id="contact">
        <h2>문의하기</h2>
        <form action="#" method="post">
          <label for="name">이름:</label>
          <input type="text" id="name" name="name" />
          <br /><br />
          <label for="email">이메일:</label>
          <input type="email" id="email" name="email" />

          <br /><br />

          <label for="message">메시지:</label><br />
          <textarea id="message" name="message" rows="4" cols="50"></textarea>
          <br /><br />

          <button type="submit">전송하기</button>
        </form>
      </section>

      <hr />

      <article>
        <h2>최신 뉴스</h2>
        <p>새로운 서비스가 출시되었습니다.</p>
      </article>
    </main>

    <footer>
      <p>&copy; 2023 나의 웹사이트. All Rights Reserved.</p>
    </footer>
  </body>
</html>
```

## SEO

```txt

# app/robots.txt

User-agent: *
Allow: /

# Next.js sitemap.js에서 생성된 사이트맵 경로
Sitemap: https://your-domain.com/sitemap.xml
```

```
User-agent: *: 모든 검색 엔진 로봇에 적용되는 규칙임을 의미합니다.

Allow: /: 모든 페이지의 크롤링을 허용합니다.

Sitemap: https://your-domain.com/sitemap.xml: sitemap.js 파일이 생성하는 사이트맵의 경로를 명시합니다. your-domain.com을 실제 도메인으로 변경해야 합니다.
```

```

app/sitemap.js

Next.js sitemap.js를 사용해 동적으로 사이트맵을 생성할 때, 각 URL 객체에 포함될 수 있는 주요 속성들은 다음과 같습니다. 이 속성들은 검색 엔진에게 해당 URL에 대한 더 풍부한 정보를 제공하여 SEO에 도움을 줍니다.

url: 필수값. 페이지의 전체 URL을 지정합니다. (예: 'https://example.com/about')

lastModified: 해당 페이지가 마지막으로 수정된 날짜입니다. 이 값을 통해 검색 엔진은 페이지의 업데이트 여부를 빠르게 파악하고, 자주 업데이트되는 페이지를 더 자주 크롤링할 수 있습니다. Date 객체나 ISO 8601 형식의 문자열로 제공할 수 있습니다.

changeFrequency: 페이지의 콘텐츠가 얼마나 자주 변경되는지에 대한 빈도를 나타냅니다. 가능한 값은 다음과 같습니다.

'always' (항상)

'hourly' (매시간)

'daily' (매일)

'weekly' (매주)

'monthly' (매월)

'yearly' (매년)

'never' (변경되지 않음)

priority: 웹사이트 내에서 해당 페이지의 상대적인 중요도를 나타내는 값입니다. 0.0부터 1.0까지의 값을 가집니다. 일반적으로 메인 페이지는 1.0, 중요도가 낮은 페이지는 0.5 이하의 값을 설정합니다. 이 값은 순위 결정 요소는 아니지만, 크롤링 순서에 대한 힌트를 제공할 수 있습니다.


openGraph는 Facebook, Twitter, LinkedIn 등 소셜 미디어 플랫폼에서 링크를 공유할 때 표시되는 미리보기(preview)를 제어하는 프로토콜입니다. openGraph.type은 그 콘텐츠의 종류를 정의합니다.

의미: 소셜 미디어 플랫폼이 공유된 콘텐츠를 어떤 종류로 인식하고 어떻게 보여줄지 결정하는 데 사용됩니다.

값: 아래와 같은 다양한 표준 타입이 있습니다.

주요 openGraph.type 값들:
website: 가장 일반적인 타입으로, 웹사이트의 메인 페이지나 일반적인 페이지에 사용합니다. (예: https://your-domain.com)

article: 블로그 게시글이나 뉴스 기사와 같은 글 콘텐츠에 사용합니다. 이 타입을 사용하면 og:title, og:description 외에도 og:article:author, og:article:published_time 등과 같은 추가적인 메타데이터를 제공할 수 있어 소셜 미디어에서 더 풍부한 정보를 표시할 수 있습니다.

book: 도서 콘텐츠에 사용합니다.

profile: 사용자의 프로필 페이지에 사용합니다.

video.movie, video.episode: 동영상 콘텐츠에 사용합니다.

music.song: 음악 콘텐츠에 사용합니다.


```

```javascript
// app/page.js
export const metadata = {
  title: 'Next.js 15 SEO 가이드',
  description:
    'Next.js 15 App Router에서 검색 최적화를 위한 방법을 알아봅니다.',
  keywords: ['Next.js', 'SEO', 'App Router', '검색 최적화'],
  authors: [{ name: 'Gemini' }], // 작성자
  openGraph: {
    title: 'Next.js 15 SEO 가이드',
    description:
      'Next.js 15 App Router에서 검색 최적화를 위한 방법을 알아봅니다.',
    url: 'https://example.com',
    type: 'website',
  },

  // ...
  openGraph: {
    title: 'Next.js 15 SEO 가이드',
    description: 'Next.js SEO에 대한 완벽 가이드',
    url: 'https://example.com/blog/nextjs-seo',
    type: 'article', // 글 타입
    // 'article' 타입에 특화된 추가 속성
    // authors: ['https://example.com/about/kim'], // og:article:author와 같은 역할
    publishedTime: '2025-08-01T08:00:00.000Z',
  },
};

export default function Page() {
  return <h1>Next.js 15 SEO</h1>;
}
```

```
title: 검색 결과 페이지에 표시되는 제목이에요.

description: 검색 결과 페이지에 표시되는 요약 설명이에요.

openGraph: 페이스북, 트위터 같은 소셜 미디어 공유 시 미리보기에 사용되는 정보예요.
```

```
AI 기반 검색 엔진 최적화(SEO)에서 GEO는 단순히 지리적 위치(Geo-location)를 넘어 Generative Engine Optimization의 약자로 쓰이는 경우가 많습니다. 이는 생성형 AI가 내 콘텐츠를 인용하거나 답변으로 활용하도록 만드는 최적화 전략을 의미합니다.

기존의 지리적 위치 기반 SEO(Local SEO)와 AI 시대의 GEO는 약간 다른 접근이 필요합니다.

1. 기존 SEO에서의 GEO (지리적 위치 최적화)
기존 SEO에서 GEO는 특정 지역 사용자를 타겟팅하는 것을 의미합니다.

Google Business Profile (구 Google My Business): 비즈니스 주소, 전화번호, 영업시간 등을 정확하게 등록하고, 고객 리뷰를 적극적으로 관리하는 것이 가장 중요합니다.

지역 키워드: "OO동 맛집", "서울시 OO 병원"과 같이 지역명이 포함된 키워드를 콘텐츠와 메타데이터에 포함합니다.

지역 랜딩 페이지: 여러 지점이 있다면 각 지점별로 특화된 랜딩 페이지를 만들어 상세 정보를 제공합니다.

로컬 인용(Local Citations): 지역 디렉토리, 지도 서비스, 관련 웹사이트에 비즈니스 정보를 일관성 있게 등록합니다.

2. AI 기반 검색에서의 GEO (생성형 엔진 최적화)
AI가 답변을 생성하는 시대에는 단순한 트래픽 유입을 넘어, AI가 내 콘텐츠를 신뢰성 있는 출처로 인용하도록 만드는 것이 중요해졌습니다. 이는 AI가 웹사이트를 직접 방문하지 않고도 답변에 내 브랜드나 정보를 노출시킬 수 있기 때문입니다.

AI에 잘 걸리는 GEO 전략 (GEO, Generative Engine Optimization)
1. 구조화된 데이터(Schema Markup) 활용

의미: AI는 일반 텍스트보다 정형화된 데이터를 훨씬 더 잘 이해합니다. Schema Markup을 사용하여 페이지의 정보를 명확하게 정의하면, AI가 내 콘텐츠의 핵심 내용을 정확하게 파악하고 답변에 활용할 가능성이 높아집니다.

예시:

FAQPage 스키마: 자주 묻는 질문(FAQ)과 답변을 마크업하면, AI가 사용자의 질문에 대한 답변을 내 콘텐츠에서 바로 찾아 인용할 수 있습니다.

LocalBusiness 스키마: 지역 비즈니스의 경우, 주소, 연락처, 영업시간 등을 상세하게 마크업하여 AI가 지역 관련 질문에 답변할 때 내 비즈니스 정보를 제공하도록 유도할 수 있습니다.

Article 스키마: 블로그 게시글의 경우, 저자, 발행일, 요약 등을 마크업하여 콘텐츠의 신뢰성을 높입니다.

2. 사용자 의도에 맞는 콘텐츠 제작

명확한 답변: AI는 질문에 대한 명확하고 간결한 답변을 선호합니다. "A가 B인 이유 3가지"와 같이 명확한 질문에 대한 답을 구조적으로 제시하는 것이 효과적입니다.

롱테일 키워드: 사용자가 AI 챗봇에 입력하는 질문은 "OO 맛집"처럼 짧은 키워드보다 "강남역에서 24시간 하는 조용한 카페 추천해 줘"와 같이 더 길고 구체적인 경우가 많습니다. 이러한 롱테일 쿼리에 초점을 맞춰 콘텐츠를 기획해야 합니다.

3. E-E-A-T 원칙 강화

경험(Experience), 전문성(Expertise), 권위(Authoritativeness), 신뢰성(Trustworthiness)

AI는 콘텐츠의 신뢰도를 매우 중요하게 평가합니다.

경험: 실제 사용 후기나 경험을 바탕으로 한 콘텐츠는 AI가 진짜 정보라고 판단할 가능성이 높습니다.

전문성: 특정 분야의 전문가가 작성했음을 명시하는 것이 중요합니다. authors 메타데이터와 함께 전문적인 내용으로 구성해야 합니다.

권위: 관련 분야에서 인정받는 다른 신뢰성 있는 출처를 인용하거나, 외부에서 내 콘텐츠를 인용하게 만들면 권위가 높아집니다.

신뢰성: 정확하고 최신 정보를 제공하며, 허위 정보나 과장된 내용을 피하는 것이 중요합니다.

4. 대화형/자연스러운 문체 사용

AI는 대화형 인터페이스를 기반으로 하기 때문에, 자연스럽고 구어체에 가까운 문체를 더 잘 이해하고 학습합니다. 딱딱한 설명보다는 사용자와 대화하듯 질문하고 답하는 형식의 콘텐츠가 더 유리할 수 있습니다.

결론적으로, AI 시대의 GEO는 기존의 지역 SEO를 뛰어넘어 "AI가 우리 콘텐츠를 신뢰성 있는 답변 소스로 인용하게 만드는" 전략으로 진화했습니다. 이를 위해 구조화된 데이터, 명확하고 질문형에 특화된 콘텐츠, 그리고 E-E-A-T 원칙을 강화하는 것이 가장 중요합니다.
```

```typescript
// app/products/[id]/page.tsx
import type { Metadata } from 'next';

// getProduct는 내부적으로 fetch를 사용하므로 별도의 메모이제이션 로직이 필요 없음.
async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`);
  if (!res.ok) {
    // 적절한 에러 핸들링
    throw new Error('상품을 찾을 수 없습니다.');
  }
  return res.json();
}

// 1. generateMetadata에서 데이터 페칭
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id); // 첫 번째 fetch 호출

  return {
    title: product.name,
    description: product.description,
  };
}

// 2. Page 컴포넌트에서 동일한 데이터 페칭
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id); // 두 번째 호출이지만, 캐시된 결과를 사용

  return (
    <>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </>
  );
}

```

```

GEO (Generative Engine Optimization)를 위한 다른 중요한 설정과 전략은 다음과 같습니다. 이들은 AI가 콘텐츠를 더 잘 이해하고 인용하도록 돕는 데 초점을 맞춥니다.

1. Schema.org 마크업
Schema.org 마크업은 웹 페이지의 콘텐츠가 무엇인지 검색 엔진과 AI에게 명확하게 알려주는 구조화된 데이터입니다. Next.js에서 JSON-LD 형식으로 <script type="application/ld+json"> 태그를 사용해 추가할 수 있습니다. AI는 이 구조화된 데이터를 기반으로 답변을 생성할 때 정보를 추출하기 때문에 매우 중요합니다.
```

1. Article (기사/블로그 게시물)
   블로그 게시물이나 뉴스 기사처럼 글 위주의 콘텐츠에 사용됩니다. 작성자, 발행일, 헤드라인 등을 명시하여 신뢰성을 높여줍니다.

JSON

```js
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Next.js 15 SEO 최적화 완벽 가이드",
  "image": [
    "https://example.com/photos/1x1/photo.jpg",
    "https://example.com/photos/4x3/photo.jpg",
    "https://example.com/photos/16x9/photo.jpg"
  ],
  "datePublished": "2025-09-03T08:00:00+08:00",
  "dateModified": "2025-09-03T09:20:00+08:00",
  "author": {
    "@type": "Person",
    "name": "김코딩",
    "url": "https://example.com/authors/kim"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Dev Blog",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.svg"
    }
  }
}
</script>
```

2. FAQPage (자주 묻는 질문)
   자주 묻는 질문(FAQ) 목록에 사용됩니다. 사용자의 질문에 대한 명확한 답변을 제공하여 AI 챗봇이나 구글 검색 결과에 바로 노출될 수 있도록 돕습니다.

```js
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Next.js란 무엇인가요?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Next.js는 React를 기반으로 하는 웹 애플리케이션 프레임워크입니다."
    }
  }, {
    "@type": "Question",
    "name": "Next.js를 배우려면 무엇을 알아야 하나요?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "기본적인 JavaScript와 React에 대한 지식이 필요합니다."
    }
  }]
}
</script>
```

3. LocalBusiness (지역 사업체)
   식당, 병원, 상점 등 실제 위치를 가진 사업체에 사용됩니다. 주소, 전화번호, 영업시간 등의 정보를 구조화하여 지역 검색 결과에 노출될 확률을 높입니다.

```js
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "멋진 카페",
  "image": "https://example.com/cafe.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "테헤란로 123",
    "addressLocality": "서울",
    "addressRegion": "강남구",
    "postalCode": "12345",
    "addressCountry": "KR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "37.5012",
    "longitude": "127.0396"
  },
  "url": "https://example.com/cafe",
  "telephone": "+82-2-1234-5678",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" ],
      "opens": "09:00",
      "closes": "22:00"
    }
  ]
}
</script>
```

4. Product (상품)
   온라인 쇼핑몰의 상품 페이지에 사용됩니다. 상품명, 가격, 리뷰, 재고 상태 등 쇼핑과 관련된 상세 정보를 제공하여 구글 쇼핑 검색 등에 노출될 수 있도록 합니다.

```js
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "최신형 스마트폰",
  "image": [
    "https://example.com/smartphone_1.jpg",
    "https://example.com/smartphone_2.jpg"
  ],
  "description": "2025년 최신 기술이 적용된 스마트폰입니다.",
  "sku": "SMART-2025",
  "brand": {
    "@type": "Brand",
    "name": "Tech Corp"
  },
  "review": {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.5"
    },
    "author": {
      "@type": "Person",
      "name": "이용자"
    }
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/product/123",
    "priceCurrency": "KRW",
    "price": "1500000",
    "priceValidUntil": "2025-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```
