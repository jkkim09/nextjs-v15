'use client';

import { useQuery } from '@tanstack/react-query';
import { Post } from '../[id]/page';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const IsrPage = ({ data1, data2 }: { data1: Post; data2: Post }) => {
  const { id } = useParams<{ id: string }>();
  const { isPending, data, isRefetching } = useQuery({
    queryKey: ['todos'],
    staleTime: 5000,
    queryFn: () =>
      fetch('https://dummyjson.com/todos').then((res) => res.json()),
    // refetchOnMount: false, // 페이지 다시 마운트 시 자동 refetch
  });

  return (
    <section>
      <h1>{data1.title}</h1>
      <p>{data1.content}</p>

      <h1>{data2.title}</h1>
      <p>{data2.content}</p>

      <div>isRefetching: {isRefetching ? 'true' : 'false'}</div>
      <Link href={'/'}>Link</Link>
    </section>
  );
};

export default IsrPage;
