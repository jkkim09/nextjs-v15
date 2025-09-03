'use client';

import Button from '@/components/Button';
import LucideIcon from '@/components/common/Icon';
import { Skeleton } from '@/components/common/Skeleton';
import Table from '@/components/common/Table';
import { ToastDemo } from '@/components/common/Toast';
import TestComponent from '@/components/TestComponrnt';
import TestSelect from '@/components/TestSelect';

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
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
      <ToastDemo />
      <Table headers={userHeaders} data={users} />
      <LucideIcon name={'Cat'} fill="yellow" />
    </div>
  );
};

export default Page;
