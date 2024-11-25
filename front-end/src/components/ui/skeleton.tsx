import { cn } from '@/libs/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-grey', className)} {...props} />;
}

export { Skeleton };
