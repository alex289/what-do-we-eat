import { food } from '@prisma/client';

export type ApiResponse<T=food[]> = {
  status: string;
  data: T;
};
