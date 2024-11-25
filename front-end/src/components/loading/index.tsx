import { Skeleton } from '../ui/skeleton';

export function InvestmentLoading() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Skeleton className="h-[400px]" />
      <Skeleton className="h-[400px]" />
      <Skeleton className="h-[400px]" />
      <Skeleton className="h-[400px]" />
    </div>
  );
}

export function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-6">
        <Skeleton className="h-[100px]" />
        <Skeleton className="h-[100px]" />
        <Skeleton className="h-[100px]" />
        <Skeleton className="h-[100px]" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
      </div>
    </div>
  );
}
