import { Metadata, ResolvingMetadata } from 'next';
import IsrPage from '../_components/IsrPage';

export interface Post {
  id: string;
  title: string;
  content: string;
}

const ApiReq = async (id: string) => {
  const product: Post = await fetch(`https://api.vercel.app/blog/${id}`, {
    next: { revalidate: 10 },
  }).then((res) => res.json());
  return product;
};

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

/** 동적인 모든 id알 수있을때 사용한다. */
// export async function generateStaticParams() {
//   const posts: Post[] = await fetch('https://api.vercel.app/blog').then((res) =>
//     res.json()
//   );
//   return posts.map((post) => ({
//     id: String(post.id),
//   }));
// }

// // 경로를 미리 알 수 없는 경우 빈 배열 반환
export async function generateStaticParams() {
  return [];
}

type MetadataProps<T> = {
  params: Promise<T>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: MetadataProps<{ id: string }>,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { id } = await params;
  console.log('generateMetadata params', id);
  // fetch data
  const product: Post = await ApiReq(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post: Post = await ApiReq(id);

  const post2: Post = await ApiReq(id);

  return <IsrPage data1={post} data2={post2} />;
}
