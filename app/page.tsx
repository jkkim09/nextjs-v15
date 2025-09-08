'use client';

import Button from '@/components/common/Button';
import Editor from '@/components/common/HtmlEditor';
import LucideIcon from '@/components/common/Icon';
import { Skeleton } from '@/components/common/Skeleton';
import Table, { TableHeader } from '@/components/common/Table';
import Tooltip from '@/components/common/Tooltip';
import TestComponent from '@/components/TestComponrnt';
import TestSelect from '@/components/TestSelect';
import { usePreventNavigation } from '@/hooks/common/usePreventNavigation';
import { counterActions } from '@/stores/counterSlice';
import { AppDispatch, RootState } from '@/stores/store';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DOMPurify from 'dompurify';

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

interface User2 {
  id: number;
  name: string;
  age: number;
  city: string;
}

// 사용자 활성화 상태를 표시하는 커스텀 컴포넌트
const StatusComponent: React.FC<{ row: User }> = ({ row }) => {
  const statusColor = row.isActive ? 'green' : 'red';
  const statusText = row.isActive ? 'Active' : 'Inactive';
  return (
    <span style={{ color: statusColor, fontWeight: 'bold' }}>{statusText}</span>
  );
};

const Page = () => {
  const { theme, setTheme } = useTheme();
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  usePreventNavigation();

  const [editValue, setEditValue] = useState<string>('');

  const users: User[] = [
    { id: 1, name: '김민준', email: 'kim.minjun@example.com', isActive: true },
    {
      id: 2,
      name: '이서연',
      email: 'lee.seoyeon@example.com',
      isActive: false,
    },
    { id: 3, name: '박하준', email: 'park.hajun@example.com', isActive: true },
  ];

  const userHeaders = [
    { key: 'id' as const, label: 'ID' },
    { key: 'name' as const, label: '이름' },
    { key: 'email' as const, label: '이메일' },
    // 'isActive' 컬럼에 커스텀 컴포넌트(StatusComponent)를 사용
    {
      key: 'isActive' as const,
      label: '상태',
      render: StatusComponent,
    },
  ];

  const headers2: TableHeader<User2>[] = [
    { key: 'id', label: 'ID', colSpan: 2 },
    { key: 'name', label: '이름' },
    { key: 'age', label: '나이' },
    { key: 'city', label: '도시' },
  ];

  const data2: User2[] = [
    { id: 1, name: '홍길동', age: 25, city: '서울' },
    { id: 2, name: '김철수', age: 30, city: '부산' },
  ];

  const getImageId = (htmlString: string) => {
    const regex = /data-id="([^"]+)"/g;
    return Array.from(htmlString.matchAll(regex), (m) => m[1]);
  };

  const removeImageId = (htmlString: string) => {
    const regex = / data-id="([^"]+)"/g;
    return htmlString.replaceAll(regex, '');
  };

  return (
    <div className="flex flex-col p-[100px]">
      <h1 className="text-large">TEST</h1>
      <h1
        style={{
          fontSize: '48px',
        }}
      >
        TEST2
      </h1>
      <div className="rounded-5xl border-primary max-h-[100px]"></div>
      <TestComponent />
      <TestSelect />
      <div className="w-[100px] h-[100px] bg-primary animate-bounce"></div>
      <div className="mx-auto w-full max-w-sm rounded-md border border-gray-200 p-4">
        <div className="flex animate-pulse space-x-4">
          <div className="size-10 rounded-full bg-gray-200"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 rounded bg-gray-200"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
              <div className="h-2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <Button>Button</Button>
      <Button asChild>
        <span>This is link</span>
      </Button>
      <Button outline={true} onClick={() => alert('test')}>
        Button2
      </Button>
      <Skeleton />
      <Table headers={userHeaders} data={users} />
      <Table headers={headers2} data={data2} />
      <LucideIcon name={'Cat'} fill="yellow" color={'red'} />

      <div>
        <div>Count: {count}</div>
        <Button onClick={() => dispatch(counterActions.increment())}>
          증가
        </Button>
        <Button onClick={() => dispatch(counterActions.decrement())}>
          감소
        </Button>
        <Button onClick={() => dispatch(counterActions.incrementByAmount(5))}>
          +5
        </Button>
      </div>
      <Tooltip content="This is a tooltip">
        <button>Hover me</button>
      </Tooltip>
      <Button
        className="p-2 rounded-md border"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
      </Button>
      <div className="bg-primary text-sm">test</div>
      <div className="bg-primary text-md font-secondary">test</div>
      <div className="bg-primary text-lg font-primary">test</div>
      <div className="w-[300px] h-[200px] bg-secondary p-[20px] ">
        <div>TestSelect</div>
      </div>
      <h1 className="h1 drop-shadow-test border-1 border-primary rounded-test">
        TEST H1
      </h1>
      <div className="card">Card Theme</div>
      <Editor
        defaultValue={'<p>TEST</p>'}
        onChange={(e) => {
          console.log(e);
          setEditValue(e);
        }}
      />
      <Button
        onClick={() => {
          console.log('getImageId(editValue)', getImageId(editValue));
          console.log('removeImageId', removeImageId(editValue));
        }}
      >
        TEST EDITOR
      </Button>

      <div
        className="html-container ql-editor"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(editValue) }}
      />
    </div>
  );
};

export default Page;
