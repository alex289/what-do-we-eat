import { type food } from '@prisma/client';

export interface ApiResponse<T = food[]> {
  status: string;
  data: T;
}
