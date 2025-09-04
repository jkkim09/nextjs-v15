'use client';

import { useQuery } from '@tanstack/react-query';

interface Item {
  completed: boolean;
  id: number;
  todo: string;
  userId: number;
}

export interface ITest {
  limit: number;
  skip: number;
  total: number;
  todos: Item[];
}

const ApiTest = ({ item }: { item: ITest }) => {
  /**
   *  SSR 에서 받아온 값을 initialData 초기화 하여 SSR렌더링 시킨다.
   */
  const { isPending, data } = useQuery<ITest>({
    queryKey: ['todos'],
    initialData: item,
    queryFn: () =>
      fetch('https://dummyjson.com/todos').then((res) => res.json()),
    refetchOnMount: true, // 페이지 다시 마운트 시 자동 refetch
  });

  return (
    <div>
      <h1 className="text-7xl  text-primary">TEST PAGE</h1>
      <h2>{isPending ? 'isPending' : 'noIsPending'}</h2>
      <h3>
        {data?.total}:{data?.limit}:{data?.skip}
      </h3>
      <ul>
        {data?.todos.map((item, index) => {
          return <li key={index}>{item.todo}</li>;
        })}
      </ul>
    </div>
  );
};

export default ApiTest;
