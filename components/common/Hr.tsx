'use client';

import { cn } from '@/lib/utils';

const Hr = ({ className }: { className?: string }) => {
  return (
    <hr
      className={cn('h-px bg-gray-200 border-0 dark:bg-gray-700', className)}
    />
  );
};

export default Hr;
