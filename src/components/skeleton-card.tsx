import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from './ui/card';

export function SkeletonCard() {
  return (
    <Card className="w-full max-w-sm rounded-lg overflow-hidden">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </CardContent>
    </Card>
  );
}
