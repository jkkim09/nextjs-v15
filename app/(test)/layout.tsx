'use client';

import { Toaster } from '@/components/ui/sonner';

const TestRootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {children} <Toaster />
    </>
  );
};

export default TestRootLayout;
