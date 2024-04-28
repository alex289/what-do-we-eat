import type { Food } from '@/server/db/types';

export interface ApiResponse<T = Food[]> {
  status: string;
  data: T;
}

export interface PaginatedApiResponse<T = Food[]> {
  status: string;
  data: {
    count: number;
    items: T;
    page: number;
    pageSize: number;
  };
}
