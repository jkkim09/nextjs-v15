import { Skeleton as SkeletonRoot } from '@/components/ui/skeleton';

export const Skeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <SkeletonRoot className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <SkeletonRoot className="h-4 w-[250px]" />
        <SkeletonRoot className="h-4 w-[200px]" />
      </div>
    </div>
  );
};
