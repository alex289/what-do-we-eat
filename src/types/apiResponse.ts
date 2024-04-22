import type { Food } from '@/server/db/types';

export interface ApiResponse<T = Food[]> {
  status: string;
  data: T;
}
